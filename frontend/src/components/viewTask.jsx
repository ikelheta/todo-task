import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import EditTask from './editTask';
import CustomizedDialogs from './dialogue';
import { useParams } from 'react-router-dom';






export default function ViewTask(props) {
  const btnstyle = { margin: "8px 7.5px" };

  const test = { title: 'test title', status: "in progress", priority: 'high', startDate: '1-12-2022', endDate: '1-12-2023', _id: 'ssdcdfvdfvzcdsc' }

  const [task, setTask] = useState({})
  const params = useParams()





  useEffect(() => {
    if (params.id) {
      Axios.get(`http://localhost:3000/task/find/${params.id}`).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTask(res.data)
        }
      }).catch((e) => {
        setTask(test)
        console.log(e)
      })
    } else {
      setTask(props.task)
    }


  }, [])

  const handleDelete = () => {
    Axios.delete(`http://localhost:3000/task/${props.task._id || params.id}`).then((res) => {
      console.log(res.data)
      if (res.status === 200) {
        alert('task deleted')
        window.location.reload()
      }
    }).catch((e) => {
      alert('some thing went wrong in add')

    })
  }



  return (
    <div style={{ display: 'flex', marginTop: 14 }}>
      <Card style={{ width: "100vw" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant="h5" component="div">
            Title :  {task.title || 'Tittle'}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Description : {task.description || 'Description'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
            status : {task.status || 'starts from'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            priority : {task.priority || 'priority'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            start Date : {task.startDate || 'start date'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            end Date : {task.endDate || 'end date'}
          </Typography>
        </CardContent>
        <CardActions>
          {localStorage.getItem('token') && <CustomizedDialogs tittle={"Edit Task"}>
            <EditTask editMode={true} id={props.task._id} />
          </CustomizedDialogs>}
          <Button variant='contained' color='secondary' style={btnstyle} onClick={handleDelete} >Delete   <DeleteIcon></DeleteIcon> </Button>
        </CardActions>
      </Card>
    </div>
  );
}