const Joi = require("joi");

module.exports.orderSchema = Joi.object().keys({
    payer: Joi.object()
        .keys({
            lastName: Joi.string().min(3).required(),
            firstName: Joi.string().min(2).required(),
            phone: Joi.string().min(10).max(13).required(),
        })
        .required(),
    customRecepient: Joi.object().keys({
        lastName: Joi.string().min(3).required(),
        firstName: Joi.string().min(2).required(),
        phone: Joi.string().min(10).max(13).required(),
    }),
    recepient: Joi.string().valid("payer", "custom").required(),
    shippingMethod: Joi.string().valid("postOffice", "courier").required(),
    city: Joi.object()
        .keys({
            value: Joi.string(),
            name: Joi.string().required(),
        })
        .required(),
    deliveryAddress: Joi.object()
        .keys({
            street: Joi.object().keys({
                value: Joi.string(),
                name: Joi.string(),
            }),
            appartment: Joi.string().allow(""),
            houseNumber: Joi.string(),
            value: Joi.string(),
            name: Joi.string(),
        })
        .required(),
    paymentMethod: Joi.string().valid("card", "cash").required(),
    paymentService: Joi.string()
        .when("paymentMethod", {
            is: "card",
            then: Joi.string().valid("wayforpay", "liqpay").required(),
        })
        .when("paymentMethod", {
            is: "cash",
            then: Joi.string().allow(""),
        }),
    items: Joi.array()
        .items(
            Joi.object().keys({
                prodUuid: Joi.string(),
                quantity: Joi.number(),
                size: Joi.string(),
            })
        )
        .required(),
});

module.exports.registerSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    subscribe: Joi.boolean(),
});

module.exports.loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    remember: Joi.boolean(),
});
