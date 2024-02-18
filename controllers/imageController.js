const Image = require("../models/image");
const asyncHandler = require("express-async-handler");

// Display list of all images.
image_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image list");
});

// Display detail page for a specific image.
image_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: image detail: ${req.params.imagecaption}`);
})

// Display image create form on GET.
image_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image create GET");
});

// Handle image create on POST.
image_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image create POST");
});

// Display image delete form on GET.
image_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image delete GET");
});

// Handle image delete on POST.
image_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image delete POST");
});

// Display image update form on GET.
image_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image update GET");
});

// Handle image update on POST.
image_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image update POST");
});

module.exports = {
    image_list,
    image_detail,
    image_create_get,
    image_create_post,
    image_delete_get,
    image_delete_post,
    image_update_get,
    image_update_post,
}  