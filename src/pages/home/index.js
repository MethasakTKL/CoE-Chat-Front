import styles from './styles.css';
import { useNavigate } from 'react-router-dom'; // Add this
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { height, padding } from '@mui/system';
import { red } from '@mui/material/colors';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate(); // Add this
    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
        navigate('/chat', { replace: true }); // Add this

    };
    return (
        <div className='Box'>
            <center>
                <img src="https://sv1.picz.in.th/images/2023/03/06/ec6MkZ.png" alt="Logo.png" 
                border="0"
                width="55%" />
            </center>
            
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
                        <MenuItem value={'Room01'}>Room 01</MenuItem>
                        <MenuItem value={'Room02'}>Room 02</MenuItem>

                    </Select>
                </FormControl>
            </div>
            <Box textAlign='center' paddingTop={5}  >
                <Button
                    variant="string" 
                    onClick={joinRoom}
                    className="buttonjoin"
                    sx={{ height: 60, width: 150, borderRadius: 6, backgroundColor: 'rgb(160, 96, 255)'}}
                >
                    <div style={{ fontSize: "14pt" ,fontWeight: "600"}}>Join Room</div>
                </Button>
            </Box>
        </div>
    );
};

export default Home;