const emailValidator = (req, res, next) => {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Email is required",
        });
    }
    next();
};

const passwordValidator = (req, res, next) => {
    const { password } = req.body;

    if (!password || typeof password !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Password is required",
        });
    }
    if (password.length < 8) {
        return res.json({
            status: "error",
            code: 400,
            error: "Minimum password length must be 8 characters",
        });
    }
    if (password.length > 40) {
        return res.json({
            status: "error",
            code: 400,
            error: "Maximum password length must be 40 characters",
        });
    }
    next();
};

const keyValidator = (req, res, next) => {
    const { key } = req.body;

    if (!key || typeof key !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Key is required",
        });
    }
    next();
};

const otpValidator = (req, res, next) => {
    const { otp } = req.body;

    if (!otp) {
        return res.json({
            status: "error",
            code: 400,
            error: "OTP is required",
        });
    }
    next();
};

const oldPasswordValidator = (req, res, next) => {
    const { oldPassword } = req.body;

    if (!oldPassword || typeof oldPassword !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Old Password is required",
        });
    }
    if (oldPassword.length < 8) {
        return res.json({
            status: "error",
            code: 400,
            error: "Minimum password length must be 8 characters",
        });
    }
    if (oldPassword.length > 40) {
        return res.json({
            status: "error",
            code: 400,
            error: "Maximum password length must be 40 characters",
        });
    }
    next();
};

module.exports = {
    emailValidator,
    passwordValidator,
    keyValidator,
    otpValidator,
    oldPasswordValidator,
};
