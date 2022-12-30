import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { GlobalContext } from "./context/loginContext";
import { useContext , useEffect } from "react";
import axios from 'axios';
import Login from "./components/login";
import SignUp from "./components/signup";
import DashBoard from "./components/DashBoard";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {  
    const getProfile = async () => {
      try {
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true
        })

        console.log("response: ", response);

        dispatch({
          type: 'USER_LOGIN'
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])

  const logoutHandler = async () => {
    
    try {
      let response = await axios.post(`${state.baseUrl}/logout`, {
        withCredentials: true
      })
      console.log("response: ", response);

      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error: ", error);
    }

  }

  return (
    <Router>
      <div className="App">
        {state.isLogin ? (
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <span className="navbar-brand">positronX</span>
              <div
                
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button className="nav-link" onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                positronX
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
        <div className="auth-wrapper">
          <div className="auth-inner">
            {state.isLogin ? (
              <Routes>
                <Route path="*" element={<DashBoard />} />
              </Routes>
            ) : (
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
