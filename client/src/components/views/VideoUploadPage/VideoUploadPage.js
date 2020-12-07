import React, { useState } from "react";
import {
  Typography,
  Button,
  Form,
  message,
  Input,
  Icon,
  Descriptions,
} from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import { duration } from "moment";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOption = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);

  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privateNumber, setPrivateNumber] = useState(0);
  const [category, setCategory] = useState("Film & Animation");
  const [fileDuration, setFileDuration] = useState("");
  const [filePath, setFilePath] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivateNumber(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };

        setFilePath(response.data.filePath);

        Axios.post("/api/video/thumbnail", variable)
          .then((response) => {
            if (response.data.success) {
              console.log(response.data);
              setFileDuration(response.data.fileDuration);
              setThumbnail(response.data.thumbsFilePath);
            } else {
              console.log("Failed :: Make a Thumbnail.");
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log(`Failed : video upload`);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return message.warn("Please Log In First.");
    }

    if (
      videoTitle === "" ||
      description === "" ||
      category === "" ||
      filePath === "" ||
      fileDuration === "" ||
      thumbnail === ""
    ) {
      return message.warn("Please first fill all the fields.");
    }

    const variables = {
      writer: user.userData._id,
      title: videoTitle,
      description: Descriptions,
      privacy: privateNumber,
      filePath: filePath,
      category: category,
      duration: fileDuration,
      thumbnail: thumbnail,
    };

    Axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        message.success("Video Upload Success!");
        setTimeout(() => props.history.push("/"), 3000);
      } else {
        console.log("Failed :: video upload.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop Zone */}

          <Dropzone
            accept="video/*"
            onDrop={onDrop}
            multiple={false}
            maxSize={100000000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}
          {thumbnail && (
            <div>
              <img src={`http://localhost:5000/${thumbnail}`} alt={thumbnail} />
            </div>
          )}
        </div>

        <br />
        <br />

        <label>Title</label>
        <Input onChange={onTitleChange} value={videoTitle} />

        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={description} />

        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
