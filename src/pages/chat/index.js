import styles from "./styles.module.css";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MessagesReceived from "./messages";
import SendMessage from "./send-message";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Button,
  ButtonGroup,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import "./index.css";
import BasicSelect from "./onlineuser";
import RoomAndUsersColumn from "./room-and-users"; // Add this

const Chat = ({ username, room, socket }) => {
  const navigate = useNavigate();
  const leaveRoom = () => {
    socket.emit("leave_room", { username, room });
    // Redirect to home page
    navigate("/", { replace: true });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "1200" }}>
      <center>
        <Box
          sx={{
            textAlign: "center",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <img
            src="https://sgp1.vultrobjects.com/img-in-th/UOgQ3Y.png"
            alt="Logo.png"
            width="100px"
          />
          <div className="roomname">{room}</div>
          <div>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              color="success"
              sx={{ marginBottom: "10px" }}
              disabled
            >
              <div className="buttonname">ชื่อผู้ใช้งาน : {username}</div>
            </Button>
          </div>
          <Button
            variant="contained"
            onClick={leaveRoom}
            sx={{ marginLeft: "0%" }}
            color="error"
          >
            <div className="buttonname">ออกจากห้อง</div>
          </Button>
          <div className="buttonname1">ผู้ใช้งานในขณะนี้</div>
          <div>
            <Box
              sx={{
                width: "300px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <RoomAndUsersColumn
                socket={socket}
                username={username}
                room={room}
              />
            </Box>
          </div>

          {/* <Button variant="contained" onClick={handleClickOpen}>
        User
      </Button> */}
        </Box>
      </center>

      <box>
        <Grid>
          <div className="Chatbox">
            <MessagesReceived socket={socket} />
          </div>
        </Grid>
      </box>
      <center>
        <SendMessage socket={socket} username={username} room={room} />
      </center>
    </div>
  );
};

export default Chat;
