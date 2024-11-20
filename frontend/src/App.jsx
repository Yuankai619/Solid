import React, { useEffect } from "react";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import Discussion from "./pages/Discussion";
import JoinedDisscussion from "./pages/JoinedDisscussion";
import UpdateGoogleUserInfoPage from "./pages/UpdateGoogleUserInfo"
import { ClassDataProvider } from './context/ClassDataContext';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

function App() {
  return (
    <ClassDataProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updateinfo" element={<UpdateGoogleUserInfoPage />} />
        <Route path="/room/:id" element={<Discussion />} />
        <Route path="/joinedroom/:id/" element={<JoinedDisscussion />} />
      </Routes>
    </ClassDataProvider>
  );
}

export default App;
