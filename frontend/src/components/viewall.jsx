import React, { useState } from 'react'
import { useEffect } from 'react'
import ViewTask from './viewTask'
import Axios from "axios"

const ViewAll = () => {
     const [tasks, setTasks] = useState([])
     useEffect(() => {
          Axios.get('https://bluedevolopment-task.herokuapp.com:5000/task/findall').then((res) => {

               if (res.status === 200) {
                    setTasks(res.data)
               }

          }).catch((e) => {
               console.log(e);
          })
     }, [])

     return (
          <div>
               {/* {tasks.map((task)=>{
            return <ViewTask key={task._id} id= {task._id}/>
        })} */}
               <h3>Todo List</h3>
               {tasks.filter((task) => task.status === "TODO").map((task) => {
                    return <ViewTask key={task._id} task={task} />
               })}
               <h3>In Progress List</h3>
               {tasks.filter((task) => task.status === "IN Progress").map((task) => {
                    return <ViewTask key={task._id} task={task} />
               })}
               <h3>Under Review List</h3>
               {tasks.filter((task) => task.status === "Under Review").map((task) => {
                    return <ViewTask key={task._id} task={task} />
               })}
               <h3>Rework List</h3>
               {tasks.filter((task) => task.status === "Rework").map((task) => {
                    return <ViewTask key={task._id} task={task} />
               })}
               <h3>Complete List</h3>
               {tasks.filter((task) => task.status === "Completed").map((task) => {
                    return <ViewTask key={task._id} task={task} />
               })}
          </div>
     )
}

export default ViewAll