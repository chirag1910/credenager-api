const User = require("../Models/user");
const Group = require("../Models/group");
const Credential = require("../Models/credential");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateToken");
const generateRandomString = require("../Utils/generateRandomString");
const generateOTP = require("../Utils/generateOtp");
const mailOtp = require("../Utils/mailOtp");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signup = async (req, res) => {
    const { email, password: plainPassword, key: plainKey } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            const password = await bcrypt.hash(plainPassword, 7);
            const key = await bcrypt.hash(plainKey, 7);

            const user = await User.create({
                email,
                password,
                key,
            });

            const token = generateToken(user._id);

            res.cookie("JWT_TOKEN", token, {
                maxAge: 2147483647,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Account created",
                _id: user._id,
                email: user.email,
                token,
            });
        } else {
            return res.json({
                status: "error",
                code: 409,
                error: "Email already exists",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);

            res.cookie("JWT_TOKEN", token, {
                maxAge: JWT_SECRET,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Login successful",
                _id: user._id,
                email: user.email,
                token,
            });
        } else {
            return res.json({
                status: "error",
                code: 401,
                error: "Invalid email or password",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const authGoogle = async (req, res) => {
    const { googleToken, key: plainKey } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email } = ticket.getPayload();

        try {
            const user = await User.findOne({ email });

            if (!user) {
                const password = await bcrypt.hash(generateRandomString(), 7);
                const key = await bcrypt.hash(plainKey, 7);

                const user = await User.create({
                    email,
                    password,
                    key,
                });
                const token = generateToken(user._id);

                res.cookie("JWT_TOKEN", token, {
                    maxAge: 2147483647,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Account created",
                    _id: user._id,
                    email: user.email,
                    token,
                });
            } else {
                const token = generateToken(user._id);

                res.cookie("JWT_TOKEN", token, {
                    maxAge: 2147483647,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Login successful",
                    _id: user._id,
                    email: user.email,
                    token,
                });
            }
        } catch (error) {
            return res.json({
                status: "error",
                code: 500,
                error: "Some error occurred",
            });
        }
    } catch (error) {
        return res.json({ status: "error", code: 401, error: "Invalid token" });
    }
};

const resetPasswordInit = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const otp = generateOTP();
            const otpExpire = new Date(new Date().getTime() + 30 * 60 * 1000);

            if (await mailOtp(email, otp)) {
                await user.updateOne({ otp, otpExpire });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "OTP sent",
                });
            } else {
                return res.json({
                    status: "error",
                    code: 500,
                    error: "OTP not sent",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const resetPassword = async (req, res) => {
    const { email, otp, password: newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (user.otp == otp) {
                if (user.otpExpire >= new Date()) {
                    const password = await bcrypt.hash(newPassword, 7);

                    await user.updateOne({
                        password,
                        otpExpire: new Date(new Date().getTime() - 1000),
                    });

                    return res.json({
                        status: "ok",
                        code: 200,
                        message: "Password changed",
                    });
                } else {
                    return res.json({
                        status: "error",
                        code: 400,
                        error: "OTP expired",
                    });
                }
            } else {
                return res.json({
                    status: "error",
                    code: 400,
                    error: "Invalid OTP",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const verifyKey = async (req, res) => {
    const { key, userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (user) {
            if (await bcrypt.compare(key, user.key)) {
                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Valid key",
                });
            } else {
                return res.json({
                    status: "error",
                    code: 401,
                    error: "Invalid key",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 401,
                error: "Invalid email or password",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const changePassword = async (req, res) => {
    const { userId, oldPassword, password: newPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (user) {
            if (await bcrypt.compare(oldPassword, user.password)) {
                const password = await bcrypt.hash(newPassword, 7);

                await user.updateOne({
                    password,
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Password changed",
                });
            } else {
                return res.json({
                    status: "error",
                    code: 401,
                    error: "Incorrect password",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const logout = async (req, res) => {
    res.cookie("JWT_TOKEN", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.json({
        status: "ok",
        code: 200,
        message: "Logged out",
    });
};

const get = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (user) {
            const groups = await Group.find({ userId });
            const credentials = await Credential.find({ userId });

            const data = {
                groups: [],
            };

            for (let i = 0; i < groups.length; i++) {
                let group = {
                    _id: groups[i]._id,
                    name: groups[i].name,
                    credentials: [
                        credentials.filter((c) => c.groupId === groups[i]._id),
                    ],
                };

                data.groups.push(group);
            }

            data.groups.push({
                _id: null,
                name: null,
                credentials: [credentials.filter((c) => c.groupId == null)],
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Details fetched",
                userID: user._id,
                name: user.name,
                email: user.email,
                data,
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const deleteUser = async (req, res) => {
    const { userId, key, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (user) {
            if (
                (await bcrypt.compare(password, user.password)) &&
                (await bcrypt.compare(key, user.key))
            ) {
                await Group.deleteMany({ userId });
                await Credential.deleteMany({ userId });
                await user.remove();

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Account deleted",
                });
            } else {
                return res.json({
                    status: "error",
                    code: 401,
                    error: "Incorrect key or password",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

module.exports = {
    signup,
    login,
    authGoogle,
    resetPasswordInit,
    resetPassword,
    verifyKey,
    changePassword,
    logout,
    get,
    deleteUser,
};
