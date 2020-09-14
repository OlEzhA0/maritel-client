const Joi = require("joi");

module.exports.orderSchema = Joi.object().keys({
    payer: Joi.object()
        .keys({
            lastName: Joi.string()
                .min(3)
                .required()
                .error(() => ({ message: "Введите свою фамилию." })),
            firstName: Joi.string()
                .min(3)
                .required()
                .error(() => ({ message: "Введите свое имя." })),
            phone: Joi.string()
                .min(10)
                .max(13)
                .required()
                .error(() => ({ message: "Введите свой телефон." })),
        })
        .required(),
    customRecepient: Joi.object().keys({
        lastName: Joi.string()
            .min(3)
            .required()
            .error(() => ({ message: "Введите свою фамилию." })),
        firstName: Joi.string()
            .min(3)
            .required()
            .error(() => ({ message: "Введите свое имя." })),
        phone: Joi.string()
            .min(10)
            .max(13)
            .required()
            .error(() => ({ message: "Введите свой телефон." })),
    }),
    recepient: Joi.string().valid("payer", "custom").required(),
    shippingMethod: Joi.string().valid("postOffice", "courier").required(),
    deliveryAddress: Joi.string().required(),
    paymentMethod: Joi.string().valid("card", "cash").required(),
    paymentService: Joi.string().valid("wayforpay", "liqpay").required(),
    items: Joi.array().items(Joi.object().keys({
        prodUuid: Joi.string(),
        quantity: Joi.number(),
        size: Joi.string(),
    })).required(),
    city: Joi.any(),
});
