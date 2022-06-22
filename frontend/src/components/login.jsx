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
    if (email && password) {

      e.preventDefault();
      const data = { email, password }
      Axios.post('http://localhost:3000/user/login', data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            navigate("/editstatus");
          }


        })
        .catch((e) => {
          if (e.response.status === 400) {
            alert('user Name or password wrong')
          }
          if (e.response.status === 401) {
            alert('please verify you mail first')
          }

          console.log(e);
        });
    }
  };

  //========================================================================================================================================================================
  const handleReset = (e) => {
    console.log('reset');
    if (email) {
      e.preventDefault();
      Axios.post('http://localhost:3000/reset/user', { email }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('reset link sent to you')
        }
      }).catch((e) => {
        alert('some thing went wrong')
      })
    }


  }
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
        <Button
          type="submit"
          color="primary"
          style={btnstyle}
          fullWidth
          onClick={handleReset}
        >
          reset password for current email
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
