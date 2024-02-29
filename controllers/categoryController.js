const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all categories.
category_list = asyncHandler(async (req, res, next) => {
    const results = await Category.find({}).exec();

    res.status(200).json(results);
});

// Display detail page for a specific category.
category_detail = asyncHandler(async (req, res, next) => {
    const results = await Category.findOne({ slug: req.params.categoryname }).exec();

    res.status(200).json(results);
})

// Display category create form on GET.
category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle category create on POST.
category_create_post = [

    // Validate and sanitize fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a category object with escaped and trimmed data.
        const category = new Category({
            name: req.body.name,
        });

        if (!errors.isEmpty()) {
            res.status(400).json(errors.mapped());
        } else {
            await category.save();
            res.status(200).json({ message: `Successfully saved ${req.body.name}` });
        }
    }),
];

// Display category delete form on GET.
category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
});

// Handle category delete on POST.
category_delete_post = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.categoryid);

    res.status(200).json({ message: `Deleted Category: ${category.name}` });
});

// Display category update form on GET.
category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.categoryid);

    res.status(200).json(category);
});

// Handle category update on POST.
category_update_post = [

    // Validate and sanitize fields.
    body("name", "Name must not be empty.").trim().isLength({ min: 1 }),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a category object with escaped and trimmed data.
        const category = new Category({
            name: req.body.name,
            _id: req.params.categoryid,
        });

        if (!errors.isEmpty()) {
            res.status(400).json(errors.mapped());
        } else {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.categoryid,
            category,
            {
            new: true, // to return the updated document
            runValidators: true, // to ensure that any validation rules are applied.
            context: "query", //  to ensure that the pre-save middleware is triggered
            }
        );
    
        // Wait for the update to complete
        await updatedCategory.save();
    
        res
            .status(200)
            .json({ message: `Successfully updated ${updatedCategory.name}` });
        }
    }),
];

module.exports = {
    category_list,
    category_detail,
    category_create_get,
    category_create_post,
    category_delete_get,
    category_delete_post,
    category_update_get,
    category_update_post,
}  