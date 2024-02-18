const asyncHandler = require("express-async-handler");

exports.home = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});