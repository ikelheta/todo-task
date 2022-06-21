import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import Tasks from './components/tasks';
import EditTask from './components/editTask';
import { Routes, Route } from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import DenseAppBar from './components/appBar';

function App() {
  return (
    <div className="App">
      <DenseAppBar/>
      <Routes>
        
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='registrastion' element={<SignInOutContainer/>}/>
        <Route path='editstatus' element={<Tasks/>}/>
        <Route path='edittask/:id' element={<EditTask editMode= {true}/>}/>
        <Route path='addtask' element={<EditTask editMode= {false}/>}/>
        <Route path='viewall' element={<EditTask editMode= {false}/>}/>
      </Routes>
     {/* <SignInOutContainer/> */}
      {/* <Tasks/> */}
      {/* <EditTask/> */}
    </div>
  );
}

export default App;