const Group = require("../Models/group");

const create = async (req, res) => {
    const { name, userId } = req.body;

    try {
        const group = await Group.findOne({ name });

        if (!group) {
            const group = await Group.create({
                userId,
                name,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Group created",
                _id: group._id,
                name: group.name,
                userId,
            });
        } else {
            return res.json({
                status: "error",
                code: 409,
                error: "Group name already exists",
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
    const { name, _id } = req.body;

    try {
        const group = await Group.findById(_id);

        if (group) {
            await group.updateOne({
                name,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Group name updated",
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

const deleteGroup = async (req, res) => {
    const { _id } = req.body;

    try {
        const group = await Group.findById(_id);

        if (group) {
            await group.remove();

            return res.json({
                status: "ok",
                code: 200,
                message: "Group deleted",
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

module.exports = {
    create,
    update,
    deleteGroup,
};
