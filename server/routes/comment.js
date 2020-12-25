const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

// Comment 저장 요청 :: front에서 전달된 유저정보 및 코멘트 정보를 comment model에 저장하고 저장된 정보를 전달한다.
router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.status.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

// Comment request :: From VideoDetailPage
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, comments });
    });
});

router.post("/deleteComment", (req, res) => {
  Comment.findOneAndDelete({ _id: req.body.commentId }).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
});

module.exports = router;
