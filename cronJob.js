const cron = require("node-cron");
const Comment = require("./models/comment");

const deleteComments = async () => {
  await Comment.deleteMany({ isDeleted: true, replies: [] });
};

module.exports = () => {
  cron.schedule("0 6 * * Sun", () => {
    console.log("running a task at 6:00 AM every Sunday");
    // Delete comments with flag isDeleted true
    deleteComments();
  });
};
