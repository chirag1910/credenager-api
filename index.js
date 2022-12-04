const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

const userRoutes = require("./Routes/user");
const groupRoutes = require("./Routes/group");
const credentialRoutes = require("./Routes/credential");
const { health } = require("./Controllers/misc");

app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/credential", credentialRoutes);
app.get("/", health);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    mongoose.connect(process.env.DATABASE_URL);
});
