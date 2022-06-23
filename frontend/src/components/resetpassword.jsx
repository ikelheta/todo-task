import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Ale } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Axios from "axios"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const Reset = () => {
  const paperStyle = { padding: 20, width: 700, margin: "0 auto", height: "73vh", }
  const headerStyle = { margin: 0 }
  const marginTop = { marginTop: 5 }
  //========================================================================================================================================================================
  //========================================================================================================================================================================

  const [password, setPassword] = useState("")
  const params = useParams()
  const navigate = useNavigate()

  //========================================================================================================================================================================
  useEffect(() => {
    localStorage.setItem('token', params.token)
  })
  //========================================================================================================================================================================
  const handleSubmit = (e) => {
    if (password) {
      e.preventDefault()
      Axios.post(`https://bluedevolopment-task.herokuapp.com:5000/reset/${params.token}`, { password }).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem("token", params.token)
          navigate('/editstatus/all')
        }
      }).catch((e) => {
        console.log(e);
      })
    }
  }
  //========================================================================================================================================================================
  //========================================================================================================================================================================
  return (
    <Paper style={paperStyle}>
      <Grid>
        <Grid align='center'>
          <h2 style={headerStyle}>Reset Password</h2>
        </Grid>
        <form>

          <TextField fullWidth label='Password' placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={handleSubmit}>Reset</Button>
        </form>
      </Grid>

    </Paper>


  )
}

export default Reset;