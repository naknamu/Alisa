const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// Display list of all categories.
category_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category list");
});

// Display detail page for a specific category.
category_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category detail: ${req.params.categoryname}`);
})

// Display category create form on GET.
category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle category create on POST.
category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
});

// Display category delete form on GET.
category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
});

// Handle category delete on POST.
category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete POST");
});

// Display category update form on GET.
category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update GET");
});

// Handle category update on POST.
category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update POST");
});

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