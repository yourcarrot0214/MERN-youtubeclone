import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [childCommentNumber, setChildcommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;

    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });

    setChildcommentNumber(commentNumber);
  }, [props.commentLists]);

  const renderReplyComment = (parentCommentId) => {
    return props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              key={comment._id + index}
              postId={props.postId}
              comment={comment}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              key={index + comment.writer._id}
              postId={props.postId}
              commentLists={props.commentLists}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </React.Fragment>
    ));
  };

  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: "0", color: "gray" }}
          onClick={onHandleChange}
        >
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
