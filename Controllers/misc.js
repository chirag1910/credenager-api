const health = (req, res) => {
    return res.json({
        status: "ok",
        code: 200,
        message: "Server running",
    });
};

module.exports = { health };
