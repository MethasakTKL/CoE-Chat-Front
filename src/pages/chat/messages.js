// client/src/pages/chat/messages.js

import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";
import "./messages.css";
import { Grid } from "@mui/material";
import { padding } from "@mui/system";
const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null); // Add this

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages:", JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });
    return () => socket.off("last_100_messages");
  }, [socket]);
  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <Grid
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            background: "#12153B",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          key={i}
        >
          <grid>
            <span className={styles.msgMeta}>{msg.username}</span>
          </grid>
          <grid>
            <div className="msg">{msg.message}</div>
          </grid>
          <grid>
            <div className="time">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </div>
          </grid>
        </Grid>
      ))}
    </div>
  );
};

export default Messages;
