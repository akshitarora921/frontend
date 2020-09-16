import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

function Message({ message }) {
  const user = useSelector((state) => state.user);
  const [colorCode, setColorCode] = useState("");
  useEffect(() => {
    setColorCode(Math.floor(Math.random() * 16777215).toString(16));
  }, [message]);
  console.log(message);
  return (
    <p className={`chat__message ${message.name === user && "chat__reciever"}`}>
      <span
        className="chat__name"
        style={{
          color: `#${colorCode}`,
        }}
      >
        {message.name}
      </span>
      <br />
      {message.message}
      <span className="chat__time">
        {moment(new Date(message.timestamp?.toDate()).toUTCString()).format(
          "HH:MM"
        )}
      </span>
    </p>
  );
}

export default Message;
