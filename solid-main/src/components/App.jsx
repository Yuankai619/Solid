import React from "react";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import UpdateGoogleUserInfoPage from "../pages/UpdateGoogleUserInfo"
import Discussion from "../pages/Discussion";
import StreamEditorMessageCard from "./StreamEditorMessageCard";
import { ClassDataProvider } from '../context/ClassDataContext';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import JoinedDisscussion from "../pages/JoinedDisscussion";

function App() {
  return (
    <ClassDataProvider>
    <Routes>
        <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/updateinfo" element={<UpdateGoogleUserInfoPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/room/:id" element={<Discussion />} />
        <Route path="/joinedroom/:id/" element={<JoinedDisscussion />} />
    </Routes>
    </ClassDataProvider>
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