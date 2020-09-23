const { sign } = require("jsonwebtoken");

module.exports.createAccessToken = (customer) => {
    return sign({ customerId: customer.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};

module.exports.createRefreshToken = (customer, remember) => {
    return sign(
        {
            customerId: customer.id,
            remember,
            tokenVersion: customer.tokenVersion,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: remember ? "7d" : "1h",
        }
    );
};
