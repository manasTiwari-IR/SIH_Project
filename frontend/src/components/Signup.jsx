import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Signup.css";
import { useUser } from "../context/UserContext";

const SignUpPage = (props) => {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    number: 0,
    password: "",
    isCompany: false,
  });
  let navigate = useNavigate();
  const { updateUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
        number: cred.number,
        isCompany: cred.isCompany,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.AuthToken);
      updateUser();
      navigate("/");
      props.showAlert("Successfully created an account", "success");
    } else {
      props.showAlert("Invalid Details try again", "warning");
    }
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    } // eslint-disable-next-line
  }, []);

  return (
    <div className="sign_box">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={cred.name}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your mail"
              name="email"
              value={cred.email}
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telno">Contact Number:</label>
            <input
              type="tel"
              id="contact_number"
              placeholder="Enter you contact number"
              name="number"
              value={cred.number}
              onChange={onChange}
              maxLength={10}
              minLength={10}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
              name="password"
              value={cred.password}
              onChange={onChange}
              minLength={8}
              required
            />
          </div>
          <div className="form-group radio-form">
            <label>Are you here to hire?</label>
            <div className="radio_box">
              <label htmlFor="Yes">Yes</label>
              <input
                type="radio"
                id="yes"
                name="isCompany"
                onChange={() => setCred({ ...cred, isCompany: true })}
              />
              <label htmlFor="No">No</label>
              <input
                type="radio"
                id="no"
                name="isCompany"
                onChange={() => setCred({ ...cred, isCompany: false })}
              />
            </div>
          </div>
          <button type="submit">Sign Up</button>
          <p className="Go-to-login">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
