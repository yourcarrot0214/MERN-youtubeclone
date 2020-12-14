const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) variable = { videoId: req.body.videoId };
  else variable = { commentId: req.body.commentId };

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, likes });
  });
});

router.post("/getDisLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) variable = { videoId: req.body.videoId };
  else variable = { commentId: req.body.commentId };

  DisLike.find(variable).exec((err, disLikes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, disLikes });
  });
});

module.exports = router;
