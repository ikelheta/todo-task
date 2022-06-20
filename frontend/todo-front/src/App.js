import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import Tasks from './components/tasks';
import ViewTask from './components/viewTask';
import EditTask from './components/editTask';
function App() {
  return (
    <div className="App">
     {/* <SignInOutContainer/> */}
     {/* <Tasks/> */}
      {/* <ViewTask/> */}
      <EditTask/>
    </div>
  );
}

export default App;