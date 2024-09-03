import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Login.css";
import { useUser } from "../context/UserContext";

const LoginPage = (props) => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const { updateUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.AuthToken);
      updateUser();
      navigate("/");
      props.showAlert("Welcome back !", "success");
    } else {
      props.showAlert("Invalid Details try again", "danger");
    }
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } // eslint-disable-next-line
  }, []);
  return (
    <div className="login_box">
      <div className="login-container">
        <h2>Login</h2>
        <form className="loginform" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={cred.email}
              id="email"
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={cred.password}
              onChange={onChange}
              placeholder="Enter you password"
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account ?{" "}
            <Link to="/signup" className="sign">
              {" "}
              Sign In{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
