const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all comments.
comment_list = asyncHandler(async (req, res, next) => {
  const results = await Comment.find({}).exec();

  res.status(200).json(results);
});

// Handle comment create on POST.
comment_create_post = [
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
      reply_to: req.body.reply_to,
      image: req.body.image,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await comment.save();
      res
        .status(200)
        .json({
          message: `Successfully saved comment from ${req.body.uploader}`,
        });
    }
  }),
];

// Handle Comment delete on POST.
comment_delete_post = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentid);

  res.status(200).json({ message: `Comment deleted from ${comment.uploader}` });
});

// Handle Comment update on POST.
comment_update_post = [
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
      reply_to: req.body.reply_to,
      image: req.body.image,
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

      res
        .status(200)
        .json({
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
};
