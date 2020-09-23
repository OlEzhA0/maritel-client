const { verify } = require("jsonwebtoken");

const isAuth = (req, _res, next) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
        return next();
        // return res.status(400).json({ ok: false, error: "not authorized" });
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET);
        req.customer = payload;
    } catch (error) {
        // res.status(400).json({ ok: false, error: "not authorized" });
    }

    return next();
};

module.exports = isAuth;
