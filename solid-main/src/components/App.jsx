import React from "react";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home"; 
// import GetUserState from "../../backend/passportConfig";
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" Component={LoginPage}/>
        <Route path="/login" Component={LoginPage}/>
        <Route path="/signup" Component={SignupPage}/>
        <Route path="/home" Component={HomePage}/> 
      </Routes>
  );
}

export default App;
