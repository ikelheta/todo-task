import { Grid, MenuItem, Paper, Select, TextField, Typography, Button, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useParams } from 'react-router-dom';
import Axios from "axios";
import { toast } from 'react-toastify';




const EditTask = (props) => {
  const paperStyle = {
    padding: 20,
    height: 490,
    width: '400px',
    margin: "0 auto",
  };
  const headerStyle = { margin: 0 };
  //========================================================================================================================================================================


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [priorityList, setPriorityList] = useState(['Low', 'Medium', 'High']);
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState(['TODO', 'IN Progress', 'Under Review', 'Rework', 'Completed'])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { id } = useParams();




  const handleSubmit = (e) => {

    const data = { title, description, priority, status, startDate, endDate }
    if (!props.editMode) {
      Axios.post('http://localhost:3000/task/add', data).then((res) => {
        console.log(res.data)
      }).catch((e) => {
        alert('some thing went wrong in add')

      })
    } else {
      Axios.put(`http://localhost:3000/task/update/${props.id}`, data).then((res) => {
        console.log(res.data);
      }).catch((e) => {
        alert('some thing went wrong in edit')
      })
    }
  }
  //========================================================================================================================================================================

  const AddNotify = () => {
    toast("succesfully added ");
    toast.success("succesfully added  ", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  useEffect(() => {
    console.log(props);
    if (props.editMode) {
      console.log("object");
      Axios.get(`http://localhost:3000/task/find/${props.id}`).then((res) => {
        console.log(res.data);
        const { title, description, endDate, startDate, priority, status } = res.data
        setDescription(description)
        setEndDate(endDate)
        setPriority(priority)
        setStartDate(startDate)
        setStatus(status)
        setTitle(title)
      })
    }

  }, [])

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>{props.editMode && "Edit Task" || "Add New Task"}</h2>
          <Typography variant="caption" >
            {props.editMode && "edit Task and save !"}
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Title"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            fullWidth
            label="Description"
            placeholder="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "15px" }}
            value={description}
          />
          <InputLabel
            id="demo-simple-select-label"
            style={{ marginBottom: "7.5px" }}
          >
            Priority
          </InputLabel>

          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Priority"
            placeholder="Priority"
            required
            onChange={(e) => setPriority(e.target.value)}
            style={{ marginBottom: "30px" }}
            value={priority}
          >

            {
              priorityList.map((ele, index) => {
                return (
                  <MenuItem key={index} value={ele}>{ele}</MenuItem>
                )
              })
            }
          </Select>
          <InputLabel
            id="demo-simple-select-label"
            style={{ marginBottom: "7.5px" }}
          >
            Status
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Priority"
            placeholder="Priority"
            required
            onChange={(e) => setStatus(e.target.value)}
            style={{ marginBottom: "30px" }}
            value={status}
          >

            {statusList.map((ele, index) => {
              return (
                <MenuItem key={index} value={ele}>{ele}</MenuItem>
              )
            })}
          </Select>
          <KeyboardDatePicker
            placeholder="yyyy/MM/dd"
            onChange={(date) => setStartDate(date)}
            format="yyyy/MM/dd"
            style={{ width: '45%', marginRight: '5%' }}
            label="Start Date"
            value={startDate}


          />
          <KeyboardDatePicker
            placeholder="yyyy/MM/dd"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            format="yyyy/MM/dd"
            style={{ width: '45%' }}
            label="End Date"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '5vh' }} onClick={(e) => handleSubmit(e)}>
            {props.editMode && "save" || "Add"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default EditTask;
