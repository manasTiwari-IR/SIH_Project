import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './SignUp.css';

const SignUpPage = () => {
    return (
        <div className='sign_box'>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            id="name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telno">Contact Number:</label>
                        <input
                            type="tel"
                            id="contact_number"
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
                            minLength={8}
                            required
                        />
                    </div>
                    <div className="form-group radio-form">
                        <label>Are you here to hire?</label>
                        <div className='radio_box'>
                            <label htmlFor="Yes">Yes</label>
                            <input
                                type="radio"
                                id="yes"
                                name="agreement"
                                value="yes"
                            />
                            <label htmlFor="No">No</label>
                            <input
                                type="radio"
                                id="no"
                                name="agreement"
                                value="no"
                            />
                        </div>
                    </div>
                    <button type="submit">Sign Up</button>
                    <p className='Go-to-login'>Already have an account? <a href="" style={{ color: "blue", textDecoration: "underline" }}>Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
