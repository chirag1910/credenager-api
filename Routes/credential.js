const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/auth");

const {
    identifierValueValidator,
    credentialIdValidator,
} = require("../Validators/credential");

const {
    create,
    update,
    updateGroup,
    deleteCredential,
} = require("../Controllers/credential");

router.post("/create", auth, identifierValueValidator, create);
router.post(
    "/update",
    auth,
    identifierValueValidator,
    credentialIdValidator,
    update
);
router.post("/update/group", auth, credentialIdValidator, updateGroup);
router.post("/delete", auth, credentialIdValidator, deleteCredential);

module.exports = router;
