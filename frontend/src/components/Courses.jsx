import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [Courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/mlmodels/getcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          AuthToken: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (json.success) {
        setCourses(json.data);
        console.log(json.data);
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchCourses();
    }
  }, [updateUser]);

  useEffect(() => {
    if (user && user.isCompany && localStorage.getItem("token")) {
      navigate("/error");
    }
  }, [user]);

  return (
    <>
      <div className="flex-col mx-10">
        {Courses.length > 0 ? (
          Courses.map((course, index) => (
            <div key={index} className="course-card">
              {course.Course_Title}: <a href={course.URL} target="_blank" rel="noopener noreferrer">Link</a>
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </>
  );
};

export default Courses;
