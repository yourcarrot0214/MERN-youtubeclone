import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input, Tooltip } from "antd";
import Axios from "axios";
import LikeDisLikes from "./LikeDisLikes";
import moment from "moment";
import "./styles/SingleComment.css";
import EditComment from "./EditComment";

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
    <LikeDisLikes
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span
      onClick={onClickReplyOpen}
      key="comment-basic-reply-to"
      style={{ marginLeft: "1rem" }}
    >
      Reply to
    </span>,
    props.comment.writer._id === localStorage.getItem("userId") ? (
      <EditComment
        comment={props.comment}
        deleteFunction={props.deleteFunction}
      />
    ) : null,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="Writer Image" />}
        content={<p>{props.comment.content}</p>}
        datetime={
          <Tooltip
            title={moment(props.comment.createdAt).format(
              "YYYY[년] MM[월] DD[일] h:mm:ss a"
            )}
          >
            <span>{moment(props.comment.createdAt, "YYYYMMDD").fromNow()}</span>
          </Tooltip>
        }
      >
        {openReply && (
          <form style={{ display: "flex" }} onSubmit={onSubmit}>
            <TextArea
              style={{ width: "100%", borderRadius: "5px" }}
              onChange={onHandleChange}
              value={commentValue}
              placeholder="코멘트를 작성해 주세요."
            />

            <br />
            <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
              Submit
            </Button>
          </form>
        )}
      </Comment>
    </div>
  );
}

export default SingleComment;
