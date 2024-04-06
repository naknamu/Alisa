const Comment = require("../models/comment");
const Image = require("../models/image");
const Uploader = require("../models/uploader");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all comments.
comment_list = asyncHandler(async (req, res, next) => {
  const results = await Comment.find({}).populate("uploader").exec();

  res.status(200).json(results);
});

// Handle comment create on POST.
comment_create_post = [
  // Validate and sanitize fields.
  body("uploader", "Uploader must not be empty.").trim().isLength({ min: 1 }),
  body("message", "Message must not be empty.").trim().isLength({ min: 1 }),
  body("image", "Image must not be empty.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a comment object with escaped and trimmed data.
    const comment = new Comment({
      uploader: req.body.uploader,
      message: req.body.message,
      image: req.body.image,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await comment.save();
      await Image.findOneAndUpdate(
        { _id: req.body.image },
        { $push: { comments: comment._id } }
      );
      await Uploader.findOneAndUpdate(
        { _id: req.body.uploader },
        { $push: { comments: comment._id } }
      );

      res.status(200).json({
        message: `Successfully saved comment from ${req.body.uploader}`,
      });
    }
  }),
];

// Handle reply create on POST.
reply_create_post = [
  // Validate and sanitize fields.
  body("uploader", "Uploader must not be empty.").trim().isLength({ min: 1 }),
  body("message", "Message must not be empty.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const { commentId, imageId } = req.params;

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a comment object with escaped and trimmed data.
    const replyObj = {
      uploader: req.body.uploader,
      message: req.body.message,
      image: imageId,
      parent: commentId,
    };

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      const newReply = await new Comment(replyObj).save();
      await Comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { replies: newReply._id } }
      );
      await Image.findOneAndUpdate(
        { _id: imageId },
        { $push: { comments: newReply._id } }
      );
      await Uploader.findOneAndUpdate(
        { _id: req.body.uploader },
        { $push: { comments: newReply._id } }
      );
      res.status(200).json({
        message: `Successfully saved reply`,
      });
    }
  }),
];

// Handle Comment delete on POST.
comment_delete_post = asyncHandler(async (req, res, next) => {

  // Change the status of delete flag 
  // else delete the comment permanently
  if (req.body.isDeleted) {
    const result = await Comment.findOneAndUpdate(
      { _id: req.params.commentid },
      { $set: { isDeleted: req.body.isDeleted } }
    );

    res.status(200).json({ message: `Comment ${req.params.commentid}, delete flag set to true` });

  } else {
    const comment = await Comment.findByIdAndDelete(req.params.commentid);
    await Image.findOneAndUpdate(
      { _id: req.params.imageid },
      { $pull: { comments: req.params.commentid } }
    );
    await Uploader.findOneAndUpdate(
      { _id: req.params.uploaderid },
      { $pull: { comments: req.params.commentid } }
    );

    res.status(200).json({ message: `Comment deleted permanently from ${comment.uploader}` });
  }
});

// Handle Comment update on POST.
comment_update_post = [
  // Convert replies to an array
  (req, res, next) => {
    if (!(req.body.replies instanceof Array)) {
      if (typeof req.body.replies === "undefined") req.body.replies = [];
      else req.body.replies = new Array(req.body.replies);
    }

    next();
  },

  // Validate and sanitize fields.
  body("uploader", "Uploader must not be empty.").trim().isLength({ min: 1 }),
  body("message", "Message must not be empty.").trim().isLength({ min: 1 }),
  // body("reply_to", "Reply_to must not be empty.").trim().isLength({ min: 1 }),
  body("image", "Image must not be empty.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a comment object with escaped and trimmed data.
    const comment = new Comment({
      uploader: req.body.uploader,
      message: req.body.message,
      parent: req.body.parent,
      image: req.body.image,
      replies: req.body.replies,
      _id: req.params.commentid,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      const updateComment = await Comment.findByIdAndUpdate(
        req.params.commentid,
        comment
      );

      // // Wait for the update to complete
      await updateComment.save();

      res.status(200).json({
        message: `Successfully updated comment from ${updateComment.uploader}`,
      });
    }
  }),
];

module.exports = {
  comment_list,
  comment_create_post,
  comment_delete_post,
  comment_update_post,
  reply_create_post,
};
