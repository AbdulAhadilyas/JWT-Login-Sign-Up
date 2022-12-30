import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import Alert from "./alert";
import { GlobalContext } from '../context/loginContext';


const baseUrl = "http://localhost:5001";
export default function Login() {
  const [result, setResult] = useState("");
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { state, dispatch } = useContext(GlobalContext);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `${state.baseUrl}/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: 'USER_LOGIN',
        payload: null
    })

      showAlert("login successful", "success");
      console.log("login successful");
      setResult("login successful");
    } catch (e) {
      console.log("e: ", e);
      showAlert(e.response.data, "danger");
    }

    // e.reset();
  };



  
  return (
    <>
     <Alert alert={alert}/>
    <form onSubmit={loginHandler}>
      <h3>Sign In</h3>
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

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
            />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
            </>
  );
}
