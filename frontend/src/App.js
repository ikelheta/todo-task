import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import Tasks from './components/tasks';
import EditTask from './components/editTask';
import { Routes, Route } from "react-router-dom";
import Signup from './components/signup';
import Login from './components/login';
import DenseAppBar from './components/appBar';
import ViewAll from './components/viewall';
import Reset from './components/resetpassword';
import Confirmation from './components/confirmation';

function App() {
  return (
    <div className="App">
      <DenseAppBar />
      <Routes>

        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='' element={<SignInOutContainer />} />
        <Route path='editstatus' element={<Tasks />} />
        <Route path='edittask/:id' element={<EditTask editMode={true} />} />
        <Route path='addtask' element={<EditTask editMode={false} />} />
        <Route path='editstatus/all' element={<ViewAll />} />
        <Route path='confirmation/:token' element={<Confirmation />} />
        <Route path='reset/:token' element={<Reset />} />

      </Routes>
    </div>
  );
}

export default App;