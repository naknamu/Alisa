const Image = require("../models/image");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all images.
image_list = asyncHandler(async (req, res, next) => {
    //res.send("NOT IMPLEMENTED: image list");
    const results = await Image.find({}).exec();

    res.status(200).json(results);
});

// Display detail page for a specific image.
image_detail = asyncHandler(async (req, res, next) => {
    const results = await Image.findOne({ slug: req.params.imagecaption })
        .populate("category uploader")
        .exec();

    res.status(200).json(results);
})

// Display image create form on GET.
image_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image create GET");
});

// Handle image create on POST.
image_create_post = [
    // Convert category to an array
    (req, res, next) => {
        if (!(req.body.category instanceof Array)) {
        if (typeof req.body.category === "undefined") req.body.category = [];
        else req.body.category = new Array(req.body.category);
        }

        next();
    },

    // Validate and sanitize fields.
    body("caption", "Caption must not be empty.").trim().isLength({ min: 1 }),
    // body("prompt", "Prompt must not be empty.").trim().isLength({ min: 1 }),
    body("category", "Category must not be empty.").trim().isLength({ min: 1 }),
    body("uploader", "Uploader must not be empty.").trim().isLength({ min: 1 }),
    body("source", "Source must not be empty.").trim().isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        const image = new Image({
            caption: req.body.caption,
            prompt: req.body.prompt,
            category: req.body.category,
            uploader: req.body.uploader,
            source: req.body.source,
        });

        if (!errors.isEmpty()) {
            res.status(400).json(errors.mapped());
        } else {
            await image.save();
            res.status(200).json({ message: `Successfully saved ${req.body.caption}` });
        }
    }),
];

// Display image delete form on GET.
image_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: image delete GET");
});

// Handle image delete on POST.
image_delete_post = asyncHandler(async (req, res, next) => {
    //res.send("NOT IMPLEMENTED: image delete POST");
    const image = await Image.findByIdAndDelete(req.params.imageid);

    res.status(200).json({ message: `Deleted Image: ${image.caption}` });
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