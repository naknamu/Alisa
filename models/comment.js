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
        reply_to: {
            type: Schema.Types.ObjectId,
            ref: "Uploader",
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "Image",
            required: true,
        },
    },
    { timestamps: true }
);

// Export model
module.exports = mongoose.model("Comment", CommentSchema);