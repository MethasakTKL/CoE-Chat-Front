import styles from "./styles.module.css";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import RoomAndUsersColumn from "./room-and-users"; // Add this
import MessagesReceived from "./messages";
import SendMessage from "./send-message";
import OnlineUser from "./onlineuser";
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
          <Button variant="contained" onClick={handleClickOpen} color="success" disabled>
            <div className="buttonname">ชื่อผู้ใช้งาน : {username}</div>
            
          </Button>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ marginLeft: "10px" }}
            color="success"
          >
            <div className="buttonname">ผู้ใช้งานในขณะนี้</div>
          </Button>
          <Button
            variant="contained"
            onClick={leaveRoom}
            sx={{ marginLeft: "10px" }}
            color="error"
          >
            <div className="buttonname">ออกจากห้อง</div>
          </Button>

          {/* <Button variant="contained" onClick={handleClickOpen}>
        User
      </Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <div className="popuser">ผู้ใช้งานอยู่ในขณะนี้</div>
            </DialogTitle>
            <DialogContent sx={{ width: "300px" }}>
              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                <div className="buttonname">ปิดหน้าต่าง</div>
              </Button>
            </DialogActions>
          </Dialog>
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
