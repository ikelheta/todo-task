import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 700,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  //========================================================================================================================================================================
  //========================================================================================================================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //========================================================================================================================================================================
  const navigate = useNavigate();
  //========================================================================================================================================================================
  const handleSubmit = (e) => {
    console.log(email, password);
    if (email && password) {

      e.preventDefault();
      Axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            navigate("/editstatus");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter Email"
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
