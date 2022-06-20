import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export default function ViewTask({id}) {
    const btnstyle = { margin: "8px 7.5px" };

    const test = {title : 'test title', status: "in progress", priority: 'high', startDate: '1-12-2022', endDate: '1-12-2023'}

    useEffect(()=>{
        Axios.get(`url/${id}`).then((res)=>{
            if(res.status === 200){
                setTask(res.data)
            }
        }).catch((e)=>{
            setTask(test)
            console.log(e)
        })
    },[])

    const [task, setTask]= useState({})


    
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
    <Card style={{ minWidth: 1000 , minHeight:300}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant="h5" component="div">
          {task.title || 'Tittle'}
        </Typography>
        <Typography  sx={{ fontSize: 14 }} gutterBottom>
            Description : {task.description || 'Description'}    
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
          status : {task.status || 'starts from'}
        </Typography>
        <Typography variant="body2" gutterBottom>
          priority : {task.priority || 'priority'}
        </Typography>
        <Typography variant="body2"gutterBottom>
          start Date : {task.startDate || 'start date'}
        </Typography>
        <Typography variant="body2" gutterBottom>
          end Date : {task.endDate || 'end date'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary' style={btnstyle} >Edit   <EditIcon></EditIcon></Button>
        <Button variant='contained' color='secondary' style={btnstyle} >Delete   <DeleteIcon></DeleteIcon> </Button>
      </CardActions>
    </Card>
    </div>
  );
}