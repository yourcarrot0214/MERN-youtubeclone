const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
  {
    useId: {
      type: Schema.Type.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Type.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Type.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const Like = mongoose.Schema("Like", likeSchema);

module.exports = { Like };
