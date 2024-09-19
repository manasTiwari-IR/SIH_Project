import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles/Signup.css";

const SignUpPage = (props) => {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    number: 0,
    password: "",
    isCompany: false,
  });
  const [captchaToken, setCaptchaToken] = useState("");
  let navigate = useNavigate();
  const { updateUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaToken) {
      props.showAlert("Please verify the captcha", "warning");
      return;
    }
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
        captcha: captchaToken,
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

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Set the token when captcha is verified
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
            <label>Purpose : </label>
            <div className="radio_box">
              <input
                type="radio"
                id="yes"
                name="isCompany"
                hidden
                onChange={() => setCred({ ...cred, isCompany: true })}
              />
              <label htmlFor="yes" className="check-box">Company</label>
              <input
                type="radio"
                id="no"
                name="isCompany"
                hidden
                defaultChecked={true}
                onChange={() => setCred({ ...cred, isCompany: false })}
              />
              <label htmlFor="no" className="check-box">Employee</label>
            </div>
          </div>
          <ReCAPTCHA
            sitekey="6LcccEgqAAAAAFcsZUnKwOUIrycIPdo2xc6_DOZB"
            onChange={handleCaptchaChange}
            data-size="compact"
          />
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
