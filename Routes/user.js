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
    authGoogle,
    resetPasswordInit,
    resetPassword,
    verifyKey,
    changePassword,
    logout,
    get,
    deleteUser,
} = require("../Controllers/user");

router.post("/signup", emailValidator, passwordValidator, keyValidator, signup);
router.post("/login", emailValidator, passwordValidator, login);
router.post("/auth/google", keyValidator, authGoogle);
router.post("/reset/init", emailValidator, resetPasswordInit);
router.post(
    "/reset",
    emailValidator,
    passwordValidator,
    otpValidator,
    resetPassword
);
router.post("/verify/key", auth, keyValidator, verifyKey);
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
