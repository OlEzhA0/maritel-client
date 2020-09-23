const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Order = require("../models/order");
const Customer = require("../models/customer");

const { orderSchema } = require("../helpers/validationSchemas");
const calculateOrderTotal = require("../helpers/calculateOrderTotal");
const LiqPay = require("../helpers/liqpay.sdk");

router.post("/order", async (req, res) => {
    const errors = orderSchema.validate(req.body).error;

    if (errors) {
        res.status(400).json(errors);
    } else {
        const {
            payer,
            recepient,
            shippingMethod,
            deliveryAddress,
            paymentMethod,
            paymentService,
            items,
            city,
        } = req.body;

        const orderTotal = await calculateOrderTotal(
            items,
            shippingMethod,
            paymentMethod
        );

        let customer = { _id: undefined };

        if (req.customer) {
            try {
                customer = await Customer.findOne({
                    _id: req.customer.customerId,
                });
            } catch {}
        }

        const order = await Order.create({
            shippingMethod,
            shippingAddress: deliveryAddress,
            city,
            payer,
            recepient,
            customReceiver: recepient === "custom",
            paymentMethod,
            paymentService,
            items: orderTotal.items,
            paymentStatus: paymentMethod === "card" ? "pending" : "accepted",
            deliveryStatus: "",
            customer: customer._id,
            amount: orderTotal.sum,
        });

        try {
            customer.orders.push(order);
            await customer.save();
        } catch {}

        if (paymentMethod === "cash") {
            return res.json({ fields: {}, orderId: order.uuid });
        }

        if (paymentService === "wayforpay") {
            const data = {
                merchantAccount: process.env.WAYFORPAY_MERCHANT_ACCOUNT,
                merchantDomainName: process.env.WAYFORPAY_DOMAIN_NAME,
                orderReference: order.uuid,
                orderDate: new Date(order.date).getTime(),
                amount: order.amount,
                currency: "UAH",
                productName: orderTotal.items.map((item) => item.title),
                productCount: orderTotal.items.map((item) => item.quantity),
                productPrice: orderTotal.items.map((item) => item.price),
            };

            const keysForSignature = [
                "merchantDomainName",
                "orderReference",
                "orderDate",
                "amount",
                "currency",
                "productName",
                "productCount",
                "productPrice",
            ];

            let text = data["merchantAccount"];

            for (const key of keysForSignature) {
                if (Array.isArray(data[key])) {
                    text += `;${data[key].join(";")}`;
                } else {
                    text += `;${data[key]}`;
                }
            }

            const hash = crypto
                .createHmac("md5", process.env.WAYFORPAY_MERCHANT_SECRET)
                .update(text)
                .digest("hex");

            res.json({
                fields: {
                    ...data,
                    merchantSignature: hash,
                    serviceUrl: `${process.env.PAYMENT_HANDLER_SERVER}/orderCheckValidity/wayforpay`,
                },
                action: "https://secure.wayforpay.com/pay",
                orderId: order.uuid,
            });
        }

        if (paymentService === "liqpay") {
            const liqpay = new LiqPay(
                process.env.LIQPAY_PUBLIC_KEY,
                process.env.LIQPAY_PRIVATE_KEY
            );

            res.json({
                ...liqpay.cnb_object({
                    action: "pay",
                    amount: order.amount,
                    currency: "UAH",
                    description: orderTotal.items.reduce(
                        (acc, item) =>
                            `${acc} ${item.title} x${item.quantity}\n`,
                        ""
                    ),
                    order_id: order.uuid,
                    version: 3,
                    server_url: `${process.env.PAYMENT_HANDLER_SERVER}/orderCheckValidity/liqpay`,
                }),
                orderId: order.uuid,
            });
        }
    }
});

router.post("/orderCheckValidity/wayforpay", async (req, res) => {
    try {
        let data = {};

        for (const key in req.body) {
            data = JSON.parse(key);
        }

        let text = data["merchantAccount"];
        const keysForSignature = [
            "orderReference",
            "amount",
            "currency",
            "authCode",
            "cardPan",
            "transactionStatus",
            "reasonCode",
        ];

        for (const key of keysForSignature) {
            text += `;${data[key]}`;
        }

        const secretKey = process.env.WAYFORPAY_MERCHANT_SECRET;

        const hash = crypto
            .createHmac("md5", secretKey)
            .update(text)
            .digest("hex");
        if (hash === data["merchantSignature"]) {
            await Order.updateOne(
                { uuid: data.orderReference },
                { paymentStatus: data.transactionStatus }
            );
        }
    } catch (err) {}
});

router.post("/orderCheckValidity/liqpay", async (req, res) => {
    try {
        const data = req.body;

        const liqpay = new LiqPay(
            process.env.LIQPAY_PUBLIC_KEY,
            process.env.LIQPAY_PRIVATE_KEY
        );

        const sign = liqpay.str_to_sign(
            process.env.LIQPAY_PRIVATE_KEY +
                data.data +
                process.env.LIQPAY_PRIVATE_KEY
        );

        if (sign === data.signature) {
            const json = JSON.parse(
                Buffer.from(data.data, "base64").toString()
            );

            await Order.updateOne(
                { uuid: json.order_id },
                { paymentStatus: json.status }
            );
        }
    } catch (err) {}
});

router.get("/orderStatus/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ uuid: orderId });
        res.json({
            status: 200,
            orderStatus: order.paymentStatus,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err,
        });
    }
});

router.get("/orderStatus", async (req, res) => {
    try {
        const order = await Order.find();
        res.json({
            status: 200,
            orderStatus: order,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err,
        });
    }
});

module.exports = router;
