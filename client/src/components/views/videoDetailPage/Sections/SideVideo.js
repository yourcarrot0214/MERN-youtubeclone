import React, { useState, useEffect } from "react";
import Axios from "axios";

function SideVideo() {
  const [sideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setSideVideos(response.data.videos);
      } else {
        console.log("Failed :: get Videos.");
      }
    });
  }, []);

  const renderSideVideo = sideVideos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
        <div
          style={{ width: "40%", marginRight: "1rem", marginBottom: "1rem" }}
        >
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }}>{renderSideVideo}</div>
    </React.Fragment>
  );
}

export default SideVideo;
