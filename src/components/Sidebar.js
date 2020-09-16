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
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chat">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} name={room.data.name} id={room.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
