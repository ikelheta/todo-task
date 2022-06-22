import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BrowserRouter } from "react-router-dom";
import axios from "axios"

axios.interceptors.request.use((request) => {
  request.headers.Authorizations = ''
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);