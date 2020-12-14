const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disLikeSchema = mongoose.Schema(
  {
    useId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const DisLike = mongoose.Schema("DisLike", disLikeSchema);

module.exports = { DisLike };
