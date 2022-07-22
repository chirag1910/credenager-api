const identifierValueValidator = (req, res, next) => {
    const { identifier, value } = req.body;

    if (!identifier || typeof identifier !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Identifier is required",
        });
    }
    if (!value || typeof value !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Value is required",
        });
    }
    next();
};

const credentialIdValidator = (req, res, next) => {
    const { _id } = req.body;

    if (!_id) {
        return res.json({
            status: "error",
            code: 400,
            error: "Credential ID is required",
        });
    }
    next();
};

module.exports = {
    identifierValueValidator,
    credentialIdValidator,
};
