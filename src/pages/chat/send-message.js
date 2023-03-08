import styles from "./styles.module.css";
import React, { useState } from "react";
import "./send-message.css";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <Box>
      <div className="messagesentbox">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <input
              className={styles.messageInput}
              placeholder="ข้อความ"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              style={{ width: "auto", marginBottom: "12px" }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}
              sx={{
                // color: "black",
                width: "130px",
                height: 50,
                border: "black",
                fontSize: "14px",
                borderRadius: 3,
                marginLeft: "10px",
              }}
            >
              <div className="messagesent">ส่งข้อความ</div> 
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default SendMessage;
