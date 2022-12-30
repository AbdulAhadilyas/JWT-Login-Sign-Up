
import React from "react";
import {  useState } from "react";
import axios from 'axios';
import Alert from "./alert";


export default function SignUp() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const baseUrl = 'http://localhost:5001'

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
        let response = await axios.post(`${baseUrl}/signup`, {
            firstName: name,
            lastName: name,
            email: email,
            password: password
        })
        showAlert("login successful", "success");
        console.log("signup successful");
        setResult("signup successful")

    } catch (e) {
        console.log("e: ", e);
        showAlert(e.response.data, "danger");
    }


    // e.reset();
}
  return (
    <div>
       <Alert alert={alert}/>
      <form onSubmit={signupHandler}> 
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => { setName(e.target.value) }}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
}
