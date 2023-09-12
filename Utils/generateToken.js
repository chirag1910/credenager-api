const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: `${process.env.AUTH_EXPIRE_DAYS}d`,
    });
};

module.exports = generateToken;
