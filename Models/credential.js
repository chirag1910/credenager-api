const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    groupId: {
        type: Schema.ObjectId,
        ref: "Group",
        default: null,
    },
    identifier: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Credential", credentialSchema);
