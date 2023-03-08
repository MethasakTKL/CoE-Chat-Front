import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./room-and-users.css";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
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
    <Box className="roomAndUsersColumn1">
      <div>
        <div className="titleuser">
          <p>ผู้ใช้</p>
        </div>
        <Grid container spacing={1} columns={16}>
          {roomUsers.map((user) => (
            <Grid> 
              {/* key={user.id} */}
              <div>
                <center>
                  <div className="userbox">ชื่อผู้ใช้งาน: {user.username}</div>
                </center>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default RoomAndUsers;
