import React, { useState } from 'react'
import ViewTask from './viewTask'

const viewall = () => {
    const[tasks, setTasks]= useState([])
  return (
    <div>
        {tasks.map((task)=>{
            return <ViewTask key={task._id} id= {task._id}/>
        })}
    </div>
  )
}

export default viewall