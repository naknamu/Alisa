const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
    return `/category/${this.slug}`;
});

// Create slug from image caption
CategorySchema.pre("save", async function (next) {
    const category = this;
    try {
      const slug = slugify(category.name, { lower: true, strict: true });
      category.slug = slug;
      next();
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
});

CategorySchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      // Handle unique constraint violation error
      next(new Error("Slug must be unique"));
    } else {
      next(error);
    }
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);