import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles/Login.css";

const LoginPage = (props) => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
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

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
        captcha: captchaToken,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.AuthToken);
      updateUser();
      navigate("/");
      props.showAlert("Welcome back !", "success");
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
      navigate("/");
    }
  }, [navigate]);

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
              placeholder="Enter your password"
              required
            />
          </div>
          <ReCAPTCHA
            sitekey="6LcccEgqAAAAAFcsZUnKwOUIrycIPdo2xc6_DOZB"
            onChange={handleCaptchaChange}
            data-size="compact"
          />
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
