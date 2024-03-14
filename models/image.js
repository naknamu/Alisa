const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const ImageSchema = new Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "Uploader",
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    love: [
      {
        type: Schema.Types.String,
        ref: "Uploader"
      },
    ],
  },
  { timestamps: true }
);

// Virtual for image's URL
ImageSchema.virtual("url").get(function () {
  return `/images/${this.slug}`;
});

// Create slug from image caption
ImageSchema.pre("save", async function (next) {
  const image = this;
  try {
    const slug = slugify(image.caption, { lower: true, strict: true });
    image.slug = slug;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

ImageSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    // Handle unique constraint violation error
    next(new Error("Slug must be unique"));
  } else {
    next(error);
  }
});

// Export model
module.exports = mongoose.model("Image", ImageSchema);
