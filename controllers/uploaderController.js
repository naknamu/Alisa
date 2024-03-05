const Uploader = require("../models/uploader");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '12h'});
}

// Login a user
const uploader_login = async (req, res) => {
    const {emailOrUsername, password} = req.body;

    try {
        const uploader = await Uploader.login(emailOrUsername, password);

        // Create a token
        //const token = createToken(uploader._id);

        res.status(200).json({name: uploader.slug, email: uploader.email});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

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
          res.status(200).json({ message: `Successfully saved`, uploader: uploader.slug });
        }
    }),
];

// Display uploader delete form on GET.
uploader_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: uploader delete GET");
});

// Handle uploader delete on POST.
uploader_delete_post = asyncHandler(async (req, res, next) => {
    //res.send("NOT IMPLEMENTED: uploader delete POST");
    const uploader = await Uploader.findByIdAndDelete(req.params.uploaderid);

    res.status(200).json({ message: `Deleted Uploader: ${uploader.username}` });
});

// Display uploader update form on GET.
uploader_update_get = asyncHandler(async (req, res, next) => {
    const uploader = await Uploader.findById(req.params.uploaderid);

    res.status(200).json(uploader);
});

// Handle uploader update on POST.
uploader_update_post = [
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
          _id: req.params.uploaderid,
        });
    
        if (!errors.isEmpty()) {
            res.status(400).json(errors.mapped());
        } else {
        const updatedUploader = await Uploader.findByIdAndUpdate(
            req.params.uploaderid,
            uploader,
            {
            new: true, // to return the updated document
            runValidators: true, // to ensure that any validation rules are applied.
            context: "query", //  to ensure that the pre-save middleware is triggered
            }
        );
    
        // Wait for the update to complete
        await updatedUploader.save();
    
        res
            .status(200)
            .json({ message: `Successfully updated ${updatedUploader.username}` });
        }
    }),
];

module.exports = {
    uploader_login,
    uploader_list,
    uploader_detail,
    uploader_create_get,
    uploader_create_post,
    uploader_delete_get,
    uploader_delete_post,
    uploader_update_get,
    uploader_update_post,
}  