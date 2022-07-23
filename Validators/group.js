const nameValidator = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Group name is required",
        });
    }
    next();
};

const groupIdValidator = (req, res, next) => {
    const { _id } = req.body;

    if (!_id) {
        return res.json({
            status: "error",
            code: 400,
            error: "Group ID is required",
        });
    }
    next();
};

module.exports = {
    nameValidator,
    groupIdValidator,
};
