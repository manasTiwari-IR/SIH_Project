import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./styles/Resume.css";
import chatImg from '../assets/file.png'

const Resume = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [updateUser]);

  useEffect(() => {
    if (user && user.isCompany && localStorage.getItem("token")) {
      navigate("/error");
    }
  }, [user, updateUser]);

  const [dynamicText, setDynamicText] = useState("Build Your Resume");
  const [file, setFile] = useState(null);
  const [ratingResult, setRatingResult] = useState(
    "Upload a resume to check its rating."
  );

  const texts = [
    "Build Your Resume",
    "Craft the Perfect CV",
    "Stand Out with Your Resume",
    "Get Noticed by Employers",
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
    const changeText = () => {
      setDynamicText((prev) => {
        const nextIndex = (index + 1) % texts.length;
        setIndex(nextIndex);
        return texts[index];
      });
    };

    const intervalId = setInterval(changeText, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCheckResume = () => {
    if (file) {
      if (file.size > 500 * 1024) {
        // Check file size (500KB)
        setRatingResult("File is too large. Maximum allowed size is 500KB.");
        return;
      }
      if (file.type !== "application/pdf") {
        // Check file type
        setRatingResult("Invalid file type. Please upload a PDF.");
        return;
      }

      // Simulate resume check
      // const hasDosAndDonts = Math.random() > 0.5; // Randomly simulate success
      // if (hasDosAndDonts) {
      //   setRatingResult('Your resume rating: 5/5');
      // } else {
      //   setRatingResult('Good resume! However, make sure to include all dos and don\'ts.');
      // }
    } else {
      setRatingResult("Please upload a resume.");
    }
  };

  return (
    <div className="background">
      <div className="header">
        <div className="header-content">
          <h1
            className={`dynamic-text ${
              ratingResult === "Please upload a resume."
                ? "fade-out"
                : "fade-in"
            }`}
          >
            {dynamicText}
          </h1>
        </div>
      </div>
      <main className="container">
        <div className="left-section">
          <div className="card-wrapper">
            {/* Do's and Don'ts Card */}
            <div className="card1 do-dont-card">
              <h2>Do's and Don'ts</h2>
              <div className="content">
                <h3>Do's:</h3>
                <ul>
                  <li>Keep your resume updated.</li>
                  <li>Customize your resume for each job application.</li>
                  <li>Use action verbs and strong language.</li>
                  <li>Quantify achievements with specific metrics.</li>
                  <li>Include keywords relevant to the job description.</li>
                  <li>Use a professional, clean format.</li>
                  <li>Be honest and avoid exaggerations.</li>
                </ul>
                <h3>Don'ts:</h3>
                <ul>
                  <li>Use jargon or abbreviations that are unclear.</li>
                  <li>
                    Include irrelevant personal information like age or marital
                    status.
                  </li>
                  <li>Make your resume longer than two pages.</li>
                  <li>Use inconsistent formatting or fonts.</li>
                  <li>
                    Forget to proofread for grammatical and typographical
                    errors.
                  </li>
                  <li>
                    Overuse buzzwords without demonstrating their relevance.
                  </li>
                </ul>
              </div>
            </div>

            <div className="card1">
              <h2>Instructions</h2>
              <div className="content">
                <p>
                  Follow these instructions to create the best possible resume:
                </p>
                <ol>
                  <li>Choose a clear and professional format.</li>
                  <li>Highlight your skills and achievements clearly.</li>
                  <li>Use bullet points for easy readability.</li>
                  <li>Proofread for grammatical and typographical errors.</li>
                  <li>Include relevant experiences and education.</li>
                  <li>
                    Tailor your resume for the specific job you are applying
                    for.
                  </li>
                </ol>
              </div>
            </div>

            {/* Resume Examples Card */}
            <div className="card1">
              <h2>Resume Examples</h2>
              <div className="example-grid">
                <div className="example-card">
                  <img
                    src="https://d.novoresume.com/images/landing_page/templates/template1.png"
                    alt="Resume Example 1"
                  />
                </div>
                <div className="example-card">
                  <img
                    src="https://d.novoresume.com/images/landing_page/templates/template2.png"
                    alt="Resume Example 2"
                  />
                </div>
                <div className="example-card">
                  <img
                    src="https://d.novoresume.com/images/landing_page/templates/template0.png"
                    alt="Resume Example 3"
                  />
                </div>
                <div className="example-card">
                  <img
                    src="https://d.novoresume.com/images/doc/modern-resume-template.png"
                    alt="Resume Example 4"
                  />
                </div>
              </div>
            </div>

            {/* AI Resume Prep Card */}
            <div className="card1 ai-card">
              <h2>Resume Prep with AI</h2>
              <div className="content">
                <p>
                  Enhance your resume with AI-powered tools for better results:
                </p>
                <ul>
                  <li>Get AI-generated resume suggestions.</li>
                  <li>
                    Optimize your resume for ATS (Applicant Tracking Systems).
                  </li>
                  <li>Receive real-time feedback on content and structure.</li>
                </ul>
                <a
                  href="https://novoresume.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="novobtn mr-10"
                >
                  Try NovoResume
                </a>
                <a
                  href="https://www.zety.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="novobtn"
                >
                  Explore Zety
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="right-section">
          {/* Check Resume Capability Card */}
          <div className="card check-resume-card">
            <h2>Check Your Resume Capability</h2>
            <div className="content">
              <p>Upload your resume and check its rating:</p>
              <input
                type="file"
                id="resume-upload"
                className="file-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <p className="file-message">
                Upload only PDF files with a maximum size of 500KB.
              </p>
              <button
                id="check-resume"
                className="novobtn check-resume-novobtn"
                onClick={handleCheckResume}
              >
                Check Resume
              </button>
              <p id="rating-result">{ratingResult}</p>
            </div>
          </div>
        </div>
      </main>
      <div className="chatbox">
        <div className="logo"><img src={chatImg} alt="" /></div>
      </div>
    </div>
  );
};

export default Resume;
