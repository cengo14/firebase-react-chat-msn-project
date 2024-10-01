import React, { Suspense, useEffect, useRef, useState } from "react";
import background from "../assets/background.svg";
import EmojiPicker from "emoji-picker-react";

import { auth, db } from "../firebase";
import { GrAttachment, GrFormPrevious } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Msg from "../components/Msg";
import uploadToStorage from "../firebase/uploadStorage";

const ChatPage = ({ room, setRoom }) => {
  const [textMsg, setTextMsg] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef();
  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = e.target[1].files[0];
    console.log(files);

    setTextMsg("");
    setEmoji(false);
    setFiles(null);
    const text = textMsg.charAt(0).toUpperCase() + textMsg.slice(1);
    if (!files && textMsg.trim() === "") return;
    const url = await uploadToStorage(files);
    console.log(url);

    const messagesCol = collection(db, "messages");
    await addDoc(messagesCol, {
      text,
      media: {
        image: url,
        video: null,
        audio: null,
      },
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        email: auth.currentUser.email,
      },
      createdAt: serverTimestamp(),
    });
  };
  useEffect(() => {
    const messagesCol = collection(db, "messages");
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "desc")
    );
    const unSub = onSnapshot(q, (data) => {
      let temp = [];
      data.docs.forEach((doc) => {
        temp.push(doc.data());
      });
      setMessages(temp);
    });
    return () => unSub();
  }, []);
  useEffect(() => {
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      <img className="background-wrap" src={background} alt="" />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="chat-container">
          <header>
            <button className="btn-change" onClick={() => setRoom(null)}>
              <GrFormPrevious className="prev-icon" size={36} />
            </button>
            <p className="room-name">{room}</p>

            <div>
              {auth.currentUser ? (
                <img
                  src={auth.currentUser?.photoURL}
                  className="person-photo"
                ></img>
              ) : (
                <p className="person-name">
                  {auth.currentUser?.displayName?.charAt(0)}
                </p>
              )}
            </div>
          </header>
          <main>
            <div ref={lastMsg} />
            {messages?.map((data, key) => (
              <Msg data={data} key={key} />
            ))}
          </main>
          <div className="chat-form">
            <form onSubmit={handleSubmit}>
              <input
                value={textMsg}
                onChange={(e) => setTextMsg(e.target.value)}
                type="text"
                placeholder="Mesaj yaz.."
              />
              <label className="file-label" htmlFor="file">
                <GrAttachment size={30} />
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              <div>
                <EmojiPicker
                  onEmojiClick={(e) => setTextMsg(textMsg + e.emoji)}
                  skinTonePickerLocation="PREVIEW"
                  width={300}
                  height={400}
                  className="emoji"
                  open={emoji}
                />
                <button
                  className="btn-msg"
                  onClick={() => setEmoji(!emoji)}
                  type="button"
                >
                  <MdOutlineEmojiEmotions size={32} />
                </button>
              </div>
              <button className="btn-msg" type="submit">
                <IoMdSend size={32} />
              </button>
            </form>
          </div>
        </div>
      </Suspense>
    </div>
  );
};
export default ChatPage;
