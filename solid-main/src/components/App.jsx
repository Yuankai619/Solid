import React from "react";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import UpdateGoogleUserInfoPage from "../pages/UpdateGoogleUserInfo"
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/updateinfo" element={<UpdateGoogleUserInfoPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
{/* <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/home/signup" element={<UpdateGoogleUserInfoPage />} />
</Routes> */}