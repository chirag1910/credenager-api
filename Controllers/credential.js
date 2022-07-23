const Group = require("../Models/group");
const Credential = require("../Models/credential");

const create = async (req, res) => {
    const { userId, groupId = null, identifier, value } = req.body;

    try {
        const group = await Group.findById(groupId);

        if (group || groupId === null) {
            const credential = await Credential.create({
                userId,
                groupId,
                identifier,
                value,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Credential created",
                _id: credential._id,
                userId,
                groupId,
                identifier,
                value,
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Group not found",
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

const update = async (req, res) => {
    const { _id, identifier, value } = req.body;

    try {
        const credential = await Credential.findById(_id);

        if (credential) {
            await credential.updateOne({
                identifier,
                value,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Credential updated",
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Credential not found",
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

const updateGroup = async (req, res) => {
    const { _id, groupId = null } = req.body;

    try {
        const group = await Group.findById(groupId);

        if (group || groupId === null) {
            const credential = await Credential.findById(_id);

            if (credential) {
                await credential.updateOne({
                    groupId,
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Credential group ID updated",
                });
            } else {
                return res.json({
                    status: "error",
                    code: 404,
                    error: "Credential not found",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Group not found",
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

const deleteCredential = async (req, res) => {
    const { _id } = req.body;

    try {
        const credential = await Credential.findById(_id);

        if (credential) {
            await credential.remove();

            return res.json({
                status: "ok",
                code: 200,
                message: "Credential deleted",
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Credential not found",
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
    create,
    update,
    updateGroup,
    deleteCredential,
};
