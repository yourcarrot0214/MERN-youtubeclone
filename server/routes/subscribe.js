const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

// 구독자 수에 대한 요청 :: subscribe에 저장된 userFrom 프로퍼티 값의 길이를 전달한다.
router.post("/subscribeNumber", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

// 구독 여부에 대한 요청 :: subscribe에 저장된 데이터에서 해당된 데이터를 검색하여 결과를 전달한다.
router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let isSubscribed = false;
    if (subscribe.length !== 0) isSubscribed = true;

    return res.status(200).json({ success: true, isSubscribed: isSubscribed });
  });
});

// 구독 요청 :: 새로운 subscribe 모델을 만들어 userTo, userFrom 정보를 저장한다.
router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

// 구독 취소 요청이 :: subscribe에 저장된 데이터 중 해당되는 데이터를 삭제한다.
router.post("/unSubscribe", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
