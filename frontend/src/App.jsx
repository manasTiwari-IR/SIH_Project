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
import Search from "./components/Search";
import ErrorPage from "./components/ErrorPage";
import Resume from "./components/Resume";
import Mentoring from "./components/Mentoring";
import Courses from "./components/Courses";

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
            <Route path="addskills" element={<AddSkills showAlert={showAlert} />} />
            <Route path="createpost" element={<CreatePost showAlert={showAlert} />} />
            <Route path="search" element={<Search showAlert={showAlert} />} />
            <Route path="error" element={<ErrorPage/>}/>
            <Route path="resume" element={<Resume/>}/>
            <Route path="mentoring" element={<Mentoring/>}/>
            <Route path="courses" element={<Courses/>}/>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;