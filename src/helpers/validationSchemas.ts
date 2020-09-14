import Joi from "joi";

export const orderSchema = Joi.object().keys({
    payer: Joi.object()
        .keys({
            lastName: Joi.string().min(3).required(),
            firstName: Joi.string().min(3).required(),
            phone: Joi.string().min(10).max(13).required(),
        })
        .required(),
    customRecepient: Joi.object().keys({
        lastName: Joi.string().min(3).required(),
        firstName: Joi.string().min(3).required(),
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
            appartment: Joi.string(),
            houseNumber: Joi.string(),
            value: Joi.string(),
            name: Joi.string(),
        })
        .required(),
    paymentMethod: Joi.string().valid("card", "cash").required(),
    paymentService: Joi.string().valid("wayforpay", "liqpay").required(),
});
