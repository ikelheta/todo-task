import {
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Button,
  Avatar,
  InputLabel,
} from "@material-ui/core";
import { SelectChangeEvent } from "@material-ui/core/Select";
import React, { useEffect, useState, Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

import Axios from "axios";

const EditTask = () => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 700,
    margin: "0 auto",
  };
  const headerStyle = { margin: 0 };
  //========================================================================================================================================================================
  //========================================================================================================================================================================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    console.log(endDate,startDate);
  }, [startDate, endDate]);

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Title"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
            gutterBottom
          />
          <TextField
            fullWidth
            label="Description"
            placeholder="Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "15px" }}
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
            <MenuItem value={0}>low</MenuItem>
            <MenuItem value={1}>medium</MenuItem>
            <MenuItem value={2}>high</MenuItem>
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
            <MenuItem value={0}>todo</MenuItem>
            <MenuItem value={1}>in progress</MenuItem>
            <MenuItem value={2}>completed</MenuItem>
          </Select>
          <KeyboardDatePicker
            placeholder="yyyy/MM/dd"
            onChange={(date) => setStartDate(date)}
            format="yyyy/MM/dd"
            style={{width: '45%', marginRight: '5%'}}
            label= "Start Date"

          />
          <KeyboardDatePicker
            placeholder="yyyy/MM/dd"
            onChange={(date) => setEndDate(date)}
            format="yyyy/MM/dd"
            style={{width: '45%'}}
            label= "End Date"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth style={{marginTop: '5%'}}>
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default EditTask;
