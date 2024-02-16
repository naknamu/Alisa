const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const UploaderSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
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

// Virtual for uploader's URL
UploaderSchema.virtual("url").get(function () {
    return `/uploader/${this.slug}`;
});

// Create slug from uploader username
UploaderSchema.pre("save", async function (next) {
    const uploader = this;
    try {
      const slug = slugify(uploader.username, { lower: true, strict: true });
      uploader.slug = slug;
      next();
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
});

UploaderSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      // Handle unique constraint violation error
      next(new Error("Slug must be unique"));
    } else {
      next(error);
    }
});

// Export model
module.exports = mongoose.model("Uploader", UploaderSchema);