const Image = require("../models/image");
const Uploader = require("../models/uploader");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.home = asyncHandler(async (req, res, next) => {
  // Get details of images, uploaders and category counts (in parallel)
  const [
    numImages,
    numUploaders,
    numCategories,
  ] = await Promise.all([
    Image.countDocuments({}).exec(),
    Uploader.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("home", {
    title: "Alisa - An AI Images Sharing Platform API",
    image_count: numImages,
    uploader_count: numUploaders,
    category_count: numCategories,
  });
});
