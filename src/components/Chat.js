import React, { useState, useEffect, useRef } from "react";
import "../css/chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  MicOutlined,
} from "@material-ui/icons/";
import moment from "moment";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import Message from "./Message";
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  useEffect(() => {
    const fun = () => {
      messagesEndRef.current.scrollIntoView();
    };
    return () => {
      fun();
    };
  }, [messages]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    input.length !== 0 &&
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {moment(
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()
            ).format("HH:MM")}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <Message message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            autoFocus
            value={input}
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <IconButton>
          <MicOutlined />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
