const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "Uploader",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  { timestamps: true }
);

CommentSchema.pre("find", function (next) {
  this.populate({ path: "replies", populate: { path: "uploader" } }).populate({
    path: "uploader",
  });
  next();
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
