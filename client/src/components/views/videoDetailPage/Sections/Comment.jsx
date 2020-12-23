import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button, Input } from "antd";
const { TextArea } = Input;

function Comment(props) {
  const user = useSelector((state) => state.user);
  console.log(user);
  const videoId = props.postId;
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log("comment data : ", response.data.result);
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        console.log("Failed :: save comment.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <br />

      {/* Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  key={index + comment.content}
                  postId={videoId}
                  comment={comment}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  key={comment.content + index}
                  parentCommentId={comment._id}
                  postId={videoId}
                  commentLists={props.commentLists}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}
      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해주세요."
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
