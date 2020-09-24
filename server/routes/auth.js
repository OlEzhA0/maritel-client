const express = require("express");
const router = express.Router();
const { hash, compare } = require("bcrypt");
const { registerSchema, loginSchema } = require("../helpers/validationSchemas");
const Customer = require("../models/customer");
const Subcriber = require("../models/subscrByMail");
const {
    createAccessToken,
    createRefreshToken,
} = require("../helpers/createAuthTokens");
const { verify } = require("jsonwebtoken");
const { sendRefreshToken } = require("../helpers/sendRefreshToken");

router.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.json({ ...error, ok: false });
    }

    try {
        const { email, password, subscribe } = req.body;

        const isCustomerRegistered = await Customer.findOne({ email });

        if (isCustomerRegistered) {
            return res.json({
                ok: false,
                error: "Пользователь уже зарегистрирован",
            });
        }

        const hashedPassword = await hash(password, 12);

        const customer = await Customer.create({
            email,
            password: hashedPassword,
            status: "registering",
        });

        if (subscribe) {
            try {
                await Subcriber.create({ email });
            } catch {}
        }

        sendRefreshToken(res, createRefreshToken(customer, true));

        return res.json({ ok: true, accessToken: createAccessToken(customer) });
    } catch (error) {
        return res.json({ error, ok: false });
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.json({ ok: false, error: error, accessToken: "" });
    }
    try {
        const { email, password, remember } = req.body;

        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.json({
                ok: false,
                error: "User not found",
                accessToken: "",
            });
        }

        const valid = await compare(password, customer.password);

        if (!valid) {
            return res.json({
                ok: false,
                error: "Password is invalid",
                accessToken: "",
            });
        }

        sendRefreshToken(res, createRefreshToken(customer, remember));

        return res.json({
            ok: true,
            accessToken: createAccessToken(customer),
        });
    } catch (error) {
        res.json({ ok: false, error });
        throw new Error(error);
    }
});

router.get("/logout", async (_req, res) => {
    sendRefreshToken(res, "");
    return res.json({ ok: true, accessToken: "" });
});


router.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
        return res.json({ ok: false, accessToken: "" });
    }

    let payload = null;

    try {
        payload = verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, error, accessToken: "" });
    }

    const customer = await Customer.findById(payload.customerId);

    if (!customer) {
        return res.json({ ok: false, accessToken: "customer" });
    }

    if (payload.tokenVersion !== customer.tokenVersion) {
        return res.json({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(customer, payload.remember));

    return res.json({ ok: true, accessToken: createAccessToken(customer) });
});

module.exports = router;
