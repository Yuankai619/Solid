import React, {useEffect} from "react";
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
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Optionally, add resize event listener if you need to update --vh on window resize
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
