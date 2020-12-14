import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDisLikes(props) {
  const [likesNumber, setLikesNumber] = useState(0);
  const [disLikesNumber, setDisLikesNumber] = useState(0);
  const [like, setLike] = useState(null);
  const [disLike, setDisLike] = useState(null);

  let variable = {};

  if (props.video) {
    variable = { userId: props.userId, videoId: props.videoId };
  } else if (props.comment) {
    variable = { userId: props.userId, commentId: props.commentId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        setLikesNumber(response.data.likes.length);
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLike(true);
          }
        });
      } else {
        console.log("Failed :: get Likes Data.");
      }
    });

    Axios.post("/api/like/getDisLikes", variable).then((response) => {
      if (response.data.success) {
        setDisLikesNumber(response.data.DisLikes.length);
        response.data.disLikes.map((disLike) => {
          if (disLike.userId === props.userId) {
            setDisLike(true);
          }
        });
      } else {
        console.log("Failed :: get Dislikes Data.");
      }
    });
  }, []);

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like" theme={like ? "filled" : "outlined"} onClick />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {" "}
          {likesNumber}{" "}
        </span>
      </span>

      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={disLike ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {" "}
          {disLikesNumber}{" "}
        </span>
      </span>
    </div>
  );
}

export default LikeDisLikes;
