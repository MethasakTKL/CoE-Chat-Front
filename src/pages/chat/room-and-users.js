import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './room-and-users.css'
import { Box } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Grid } from '@mui/material';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <Box className="roomAndUsersColumn">
      <div className='roomnametitle'>Room name</div>
      <div className='roomname'>{room}</div>


      <div>
        {roomUsers.length > 0 && 
        <div className="titleuser">
        
            <p>ผู้ใช้งานขณะนี้</p>
        </div>
        }
        <Grid container spacing={2} columns={16}>
          {roomUsers.map((user) => (
            <Grid key={user.id} >
              <div className='userbox'>
              {user.username}
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <Box textAlign='center'  paddingTop={"120%"}>
                <Button
                    variant="contained"
                    onClick={leaveRoom}
                    className="buttonjoin"
                    sx={{ height: 60, width: 200, borderRadius: 5}}
                >
                    <div style={{ fontSize: "14pt" }}>ออกจากห้อง</div>
                </Button>
            </Box>
    </Box>
  );
};

export default RoomAndUsers;