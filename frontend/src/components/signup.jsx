import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Ale } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Axios from "axios"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const Signup = () => {
    const paperStyle = { padding: 20, width: 700, margin: "0 auto", height: "73vh", }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    //========================================================================================================================================================================
    //========================================================================================================================================================================
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertbool, setAlert] = useState(false)
    //========================================================================================================================================================================
    //========================================================================================================================================================================
    const handleSubmit = (e) => {
        if (name && email && password) {
            e.preventDefault()
            Axios.post('https://bluedevolopment-task.herokuapp.com:5000/user/register', { name, email, password }).then((res) => {
                if (res.status === 200) {
                    console.log('created please verifiy your mail')
                    console.log(res.data)
                    setAlert(true)
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    //========================================================================================================================================================================
    //========================================================================================================================================================================
    return (
        <Grid>
            {!alertbool && <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
                    <TextField fullWidth label='Email' placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
                    <TextField fullWidth label='Password' placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
                    <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={handleSubmit}>Sign up</Button>
                </form>
            </Paper > || <Paper align='center'>
                    <h3>please verify you mail</h3>
                </Paper>
            }

        </Grid>
    )
}

export default Signup;