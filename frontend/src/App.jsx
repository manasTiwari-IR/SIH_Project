import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home";
import LoginPage from "./components/Login";
import SignUpPage from "./components/Signup";
import CreatePost from "./components/CreatePost";
import AddSkills from "./components/AddSkills";
import Alert from "./components/Alert";
import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <UserProvider>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginPage showAlert={showAlert} />} />
            <Route path="signup" element={<SignUpPage showAlert={showAlert} />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;