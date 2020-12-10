import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.postId;
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
      responseTo: props.comment._id,
    };
    console.log(variables);

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log("singleComment response data", response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
        setOpenReply(!openReply);
      } else {
        console.log("Failed :: save comment from singleComment component.");
      }
    });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="Writer Image" />}
        content={<p>{props.comment.content}</p>}
      >
        {openReply && (
          <form style={{ display: "flex" }} onSubmit={onSubmit}>
            <textarea
              style={{ width: "100%", borderRadius: "5px" }}
              onChange={onHandleChange}
              value={commentValue}
              placeholder="코멘트를 작성해 주세요."
            />

            <br />
            <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
              Submit
            </button>
          </form>
        )}
      </Comment>
    </div>
  );
}

export default SingleComment;
