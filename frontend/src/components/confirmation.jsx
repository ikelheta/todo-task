import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from "axios"

const Confirmation = () => {

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    Axios.post(`http://localhost:3000/confirmation/${params.token}`).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        navigate('/editstatus/all')
      }
    }).catch((e) => {
      alert(`some thing went wrong`)
    })

  }, [])
  return (
    <div>confirmation</div>
  )
}

export default Confirmation