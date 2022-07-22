const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/auth");

const { nameValidator, groupIdValidator } = require("../Validators/group");

const { create, update, deleteGroup } = require("../Controllers/group");

router.post("/create", auth, nameValidator, create);
router.post("/update", auth, nameValidator, groupIdValidator, update);
router.post("/delete", auth, groupIdValidator, deleteGroup);

module.exports = router;
