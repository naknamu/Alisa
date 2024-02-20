const Uploader = require("../models/uploader");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all uploaders.
uploader_list = asyncHandler(async (req, res, next) => {
    const results = await Uploader.find({}, "username").exec();

    res.status(200).json(results);
});

// Display detail page for a specific uploader.
uploader_detail = asyncHandler(async (req, res, next) => {
    //res.send(`NOT IMPLEMENTED: uploader detail: ${req.params.uploadername}`);
    const results = await Uploader.findOne({ slug: req.params.uploadername }).exec();

    res.status(200).json(results);
})

// Display uploader create form on GET.
uploader_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader create GET");
});

// Handle uploader create on POST.
uploader_create_post = [
    // Validate and sanitize fields.
    body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Must be an email"),
    body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 }),
    body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
    
        // Create a Book object with escaped and trimmed data.
        const uploader = new Uploader({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        });
    
        if (!errors.isEmpty()) {
          res.status(400).json(errors.mapped());
        } else {
          await uploader.save();
          res.status(200).json({ message: `Successfully saved user: ${req.body.username}` });
        }
    }),
];

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