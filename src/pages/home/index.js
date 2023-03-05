import './styles.css';
import { useNavigate } from 'react-router-dom'; // Add this
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { height, padding } from '@mui/system';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate(); // Add this

    const joinRoom = () => {
      if (room !== '' && username !== '') {
        socket.emit('join_room', { username, room });
      }
  
      // Redirect to /chat
      navigate('/chat', { replace: true }); // Add this
    };
  return (
        <div className='Box'>

            <div className='TitleBox'>
                COE Chat
            </div>
            <div className='form'>
            <FormControl fullWidth>
                <TextField
                id="outlined-controlled"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}   
                />
                </FormControl>
            </div>
            <div className='form'>
            <FormControl fullWidth>

            <InputLabel id="demo-simple-select-label">Room</InputLabel>
                <Select
                label="Room"
                onChange={(e) => setRoom(e.target.value)}
                >
                </Select>
                </FormControl>
            </div>
            <Box textAlign='center' paddingTop={5}>
            <Button
             variant="contained"
             onClick={joinRoom}
             className="buttonjoin"
             sx={{height:60, width:200,borderRadius:5}}
            >
                <div style={{fontSize:"14pt"}}>Join Room</div>
            </Button>
            </Box>


        
        </div>
      );

    // <div className="container">
    //   // ...
    //     <input
    //       className="input"
    //       placeholder='Username...'
    //       onChange={(e) => setUsername(e.target.value)} // Add this
    //     />

    //     <select
    //       className="input"
    //       onChange={(e) => setRoom(e.target.value)} // Add this
    //     >
    //      // ...
    //     </select>

    //     // ...
    // </div>

};

export default Home;