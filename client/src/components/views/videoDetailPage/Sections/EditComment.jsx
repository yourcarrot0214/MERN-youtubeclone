import React from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Tooltip, Icon } from "antd";

function EditComment(props) {
  const user = useSelector((state) => state.user);
  const onDeleteFunction = () => {
    const variables = {
      commentId: props.comment._id,
    };

    Axios.post("/api/comment/deleteComment", variables).then((response) => {
      if (response.data.success) {
        props.deleteFunction(response.data.result);
      } else {
        console.log("Failed :: delete comment.");
      }
    });
  };
  return (
    <span>
      <Tooltip title="Delete Comment">
        <Icon type="delete" theme={"filled"} onClick={onDeleteFunction} />
      </Tooltip>
    </span>
  );
}

export default EditComment;
