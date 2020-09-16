import React, { useEffect, useState } from "react";
import "../css/sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useSelector } from "react-redux";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  const user = useSelector((state) => state.user);
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const searchRooms = (e) => {
    e.preventDefault();
    if (roomName.length === 0) {
      db.collection("rooms").onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    } else {
      db.collection("rooms").onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs
            .filter((doc) => doc.data().name === roomName)
            ?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
        )
      );
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <form>
            <input
              placeholder="Search or start new chat"
              value={roomName}
              type="text"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button type="submit" onClick={searchRooms}></button>
          </form>
        </div>
      </div>
      <div className="sidebar__chat">
        <SidebarChat addNewChat />
        <div className="sidebar__chat" style={{ overflowY: "auto" }}>
          {rooms.map((room) => (
            <SidebarChat key={room.id} name={room.data.name} id={room.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
