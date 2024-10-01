import React, { useState } from "react";
import { auth } from "../firebase";
import { getColorFromUserIdCached } from "../utils/colorGenerator";
import Modal from "./Modal";

const Msg = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const color = getColorFromUserIdCached(data.author.id);
  console.log(data);

  const messageStyle = {
    // borderLeft: `4px solid ${color}`,

    // backgroundColor: "#f1f1f1",
    backgroundColor: color,
  };
  const userMessageStyle = {
    // borderRight: `4px solid ${color}`,
    // backgroundColor: "#f1f1f1",
    backgroundColor: color,
  };

  const authorStyle = {
    color: color,
  };

  // -----------------------------------------
  const modalOpen = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };
  // ------------------------------------------------
  if (auth.currentUser.uid === data.author.id) {
    return (
      <div className="msg-user">
        <div style={userMessageStyle} className="msg-content">
          <p>{data.text}</p>
          {data.media.image && (
            <div className="msg-img-container">
              <img
                onClick={() => modalOpen(data.media.image)}
                className="msg-img"
                src={data.media.image}
                alt=""
              />
            </div>
          )}
        </div>
        <Modal img={selectedImage} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
  }
  return (
    <div className="msg-other">
      <div className="msg-other-area">
        <img src={data.author.photo} alt="profile" />
        <div style={messageStyle} className="msg-content">
          <span>{data.author.name.split(" ")[0]}</span>
          <p>{data.text}</p>
          {data.media.image && (
            <div className="msg-img-container">
              <img
                onClick={() => modalOpen(data.media.image)}
                className="msg-img"
                src={data.media.image}
                alt=""
              />
            </div>
          )}
        </div>
        <span>{data.createdAd}</span>
      </div>
      <Modal img={selectedImage} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Msg;
