import React from "react";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import UpdateGoogleUserInfoPage from "../pages/UpdateGoogleUserInfo"
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" Component={UpdateGoogleUserInfoPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/signup" Component={SignupPage} />
      <Route path="/home" Component={HomePage} />
      <Route path="/updateinfo" Component={UpdateGoogleUserInfoPage}></Route>
    </Routes>
  );
}

export default App;
