import React, { useState } from 'react'
import ViewTask from './viewTask'

const ViewAll = () => {
const[tasks, setTasks]= useState([{_id:1}, {_id:2}, {_id:3} , {_id:4} , {_id:5}])
  return (
    <div>
        {tasks.map((task)=>{
            return <ViewTask key={task._id} id= {task._id}/>
        })}
    </div>
  )
}

export default ViewAll