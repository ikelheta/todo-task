import React, { useState } from 'react'
import ViewTask from './viewTask'

const ViewAll = () => {
const[tasks, setTasks]= useState([{_id:1}, {_id:2}, {_id:3} , {_id:4} , {_id:5}])
  return (
    <div>
        {/* {tasks.map((task)=>{
            return <ViewTask key={task._id} id= {task._id}/>
        })} */}
        <h3>Todo List</h3>
        {tasks.filter((task)=>task.status === "todo").map((task)=>{
             return <ViewTask key={task._id} id= {task._id}/>
        })}
        <h3>In Progress List</h3>
        {tasks.filter((task)=>task.status === "In Progress").map((task)=>{
             return <ViewTask key={task._id} id= {task._id}/>
        })}
        <h3>Under Review List</h3>
        {tasks.filter((task)=>task.status === "Under Review").map((task)=>{
             return <ViewTask key={task._id} id= {task._id}/>
        })}
        <h3>Rework List</h3>
        {tasks.filter((task)=>task.status === "Rework").map((task)=>{
             return <ViewTask key={task._id} id= {task._id}/>
        })}
        <h3>Complete List</h3>
        {tasks.filter((task)=>task.status === "Cmpleted").map((task)=>{
             return <ViewTask key={task._id} id= {task._id}/>
        })}
    </div>
  )
}

export default ViewAll