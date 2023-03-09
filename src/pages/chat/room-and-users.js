// client/src/pages/chat/room-and-users.js

import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    // Redirect to home page
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <div>
        <Grid container spacing={1} justifyContent="center">
          {roomUsers.map((user) => (
            <Grid item key={user.id} sx={{color:"#FFDE59"}}>
              <span className="buttonname2">{user.username}</span>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default RoomAndUsers;
