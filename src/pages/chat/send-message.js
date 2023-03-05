import styles from './styles.module.css';
import React, { useState } from 'react';
import './send-message.css'
import { Button, FormControl, TextField } from '@mui/material';
const SendMessage = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message !== '') {
            const __createdtime__ = Date.now();
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            socket.emit('send_message', { username, room, message, __createdtime__ });
            setMessage('');
        }
    };

    return (

        <div className={styles.sendMessageContainer}>
            <input
                className={styles.messageInput}
                placeholder='ข้อความ'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <Button
                variant="contained"
                onClick={sendMessage}
                sx={{ width: 170, height: 50, borderRadius: 50 }}
            >
                ส่งข้อความ
            </Button>
        </div>
    );
};

export default SendMessage;