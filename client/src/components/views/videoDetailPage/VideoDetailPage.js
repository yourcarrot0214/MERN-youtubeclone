import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [video, setVideo] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.videoDetail);
      } else {
        console.log("Failed :: get video data.");
      }
    });
  }, []);

  if (video.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.filePath}`}
              controls
            ></video>

            <List.Item actions>
              <List.Item.Meta
                avatar={<Avatar src={video.writer.image} />}
                title={video.writer.name}
                description={video.description}
              />
            </List.Item>

            {/* Comments */}
          </div>
        </Col>

        <Col lg={6} xs={24}>
          Side Videos
        </Col>
      </Row>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default VideoDetailPage;
