const Uploader = require("../models/uploader");
const asyncHandler = require("express-async-handler");

// Display list of all uploaders.
uploader_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader list");
});

// Display detail page for a specific uploader.
uploader_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: uploader detail: ${req.params.uploadername}`);
})

// Display uploader create form on GET.
uploader_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader create GET");
});

// Handle uploader create on POST.
uploader_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader create POST");
});

// Display uploader delete form on GET.
uploader_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader delete GET");
});

// Handle uploader delete on POST.
uploader_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader delete POST");
});

// Display uploader update form on GET.
uploader_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader update GET");
});

// Handle uploader update on POST.
uploader_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader update POST");
});

module.exports = {
    uploader_list,
    uploader_detail,
    uploader_create_get,
    uploader_create_post,
    uploader_delete_get,
    uploader_delete_post,
    uploader_update_get,
    uploader_update_post,
}  