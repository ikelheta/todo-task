import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BrowserRouter} from "react-router-dom";
import axios from "axios"

axios.interceptors.request.use((request)=>{
  request.headers.Authorizations = ''
  const token = localStorage.getItem('Token')
  if(token){
  request.headers.Authorizations= `Bearer ${token}`
}
return request
})

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MuiPickersUtilsProvider>,
  document.getElementById("root")
);