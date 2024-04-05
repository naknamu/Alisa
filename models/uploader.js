const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

const UploaderSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        slug: {
            type: String,
            unique: true,
        },
        comments: [
          {
            type: Schema.Types.ObjectId,
            ref: "Comment"
          },
        ],
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

// Encrypt password before saving to the database
UploaderSchema.pre("save", async function (next) {
    const uploader = this;
    if (uploader.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      uploader.password = await bcrypt.hash(uploader.password, salt);
    }
    next();
  });

// static login method for uploader
UploaderSchema.statics.login = async function(emailOrUsername, password) {

    if (!emailOrUsername || !password) {
      throw Error('All fields must be filled');
    }
  
    const uploader = await this.findOne({ $or: [{ email: emailOrUsername}, {username: emailOrUsername}] }).select("+password");
    if (!uploader) {
      throw Error('Incorrect email or username');
    }
  
    const match = await bcrypt.compare(password, uploader.password)
    if (!match) {
      throw Error('Incorrect password');
    }
  
    return uploader;
}

// Export model
module.exports = mongoose.model("Uploader", UploaderSchema);