import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import CustomizedDialogs from './dialogue';
import EditTask from './editTask';
import { useNavigate  } from "react-router-dom";


export default function DenseAppBar() {
  const navigate = useNavigate ()






  const handleClick = ()=>{
    localStorage.clear()
    navigate('/registrastion')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{display:'flex', justifyContent:'space-between'}}>
         <CustomizedDialogs tittle = {"New Task"}>
         <EditTask editMode={false} />
         </CustomizedDialogs>
         {localStorage.getItem('token') && <Button >Log out</Button>} 
         <Button variant='contained' color='primary' onClick={handleClick}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
