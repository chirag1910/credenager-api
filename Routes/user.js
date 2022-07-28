const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/auth");

const {
    emailValidator,
    passwordValidator,
    keyValidator,
    otpValidator,
    oldPasswordValidator,
} = require("../Validators/user");

const {
    signup,
    login,
    signupGoogle,
    loginGoogle,
    resetPasswordInit,
    resetPassword,
    verifyUser,
    verifyKey,
    resetKey,
    changePassword,
    logout,
    get,
    deleteUser,
} = require("../Controllers/user");

router.post("/signup", emailValidator, passwordValidator, keyValidator, signup);
router.post("/login", emailValidator, passwordValidator, login);
router.post("/signup/google", keyValidator, signupGoogle);
router.post("/login/google", loginGoogle);
router.post("/reset/password/init", emailValidator, resetPasswordInit);
router.post(
    "/reset/password",
    emailValidator,
    passwordValidator,
    otpValidator,
    resetPassword
);
router.post("/verify", auth, verifyUser);
router.post("/verify/key", auth, keyValidator, verifyKey);
router.post("/reset/key", auth, passwordValidator, keyValidator, resetKey);
router.post(
    "/update/password",
    auth,
    oldPasswordValidator,
    passwordValidator,
    changePassword
);
router.post("/logout", auth, logout);
router.post("/", auth, get);
router.post("/delete", auth, passwordValidator, keyValidator, deleteUser);

module.exports = router;
