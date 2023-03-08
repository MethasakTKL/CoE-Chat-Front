import styles from "./styles.css";
import { useNavigate } from "react-router-dom"; // Add this
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { height, padding } from "@mui/system";
import { red } from "@mui/material/colors";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate(); // Add this
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chat", { replace: true }); // Add this
  };
  return (
    <div className="Box">
      <center>
        <img
          src="https://sv1.picz.in.th/images/2023/03/06/ec6MkZ.png"
          alt="Logo.png"
          border="0"
          width="55%"
        />
      </center>

      <div className="form">
        <FormControl fullWidth>
          <TextField
            id="outlined-controlled"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
      </div>
      <div className="form">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Room</InputLabel>
          <Select label="Room" onChange={(e) => setRoom(e.target.value)}>
            <MenuItem value={"Room 01"}>Room 01</MenuItem>
            <MenuItem value={"Room 02"}>Room 02</MenuItem>
            <MenuItem value={"Room 03"}>Room 03</MenuItem>
            <MenuItem value={"Room 04"}>Room 04</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Box textAlign="center" paddingTop={3}>
        <Button
          variant="contained"
          onClick={joinRoom}
          sx={{
            height: 60,
            width: 300,
            borderRadius: 6,
          }}
        >
          <div className="buttonjoin" >
            กดเข้าเพื่อร่วมห้อง 
         </div>
        </Button>
      </Box>
    </div>
  );
};

export default Home;
