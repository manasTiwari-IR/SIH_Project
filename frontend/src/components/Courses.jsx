import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import './styles/Courses.css'
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
      <div className="courses_list">
        {Courses.length > 0 ? (
          Courses.map((course, index) => (
            <div key={index} className="course-card">
              <h2>{course.Course_Title}</h2>
              <div className="review_course">
                <p className="rating_cour"><img src="./src/assets/star.png" alt="..." className="star_courses" />{course.Ratings}</p>
                <p>Reviews: {course.Review_Count}</p>
              </div>
              <p><b>Duration:</b> {course.Duration}</p>
              <a href={course.URL} target="_blank" rel="noopener noreferrer">
                <button className="learn_courses">
                  <img className="link_cour" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xNC44NTEgMTEuOTIzYy0uMTc5LS42NDEtLjUyMS0xLjI0Ni0xLjAyNS0xLjc0OS0xLjU2Mi0xLjU2Mi00LjA5NS0xLjU2My01LjY1NyAwbC00Ljk5OCA0Ljk5OGMtMS41NjIgMS41NjMtMS41NjMgNC4wOTUgMCA1LjY1NyAxLjU2MiAxLjU2MyA0LjA5NiAxLjU2MSA1LjY1NiAwbDMuODQyLTMuODQxLjMzMy4wMDljLjQwNCAwIC44MDItLjA0IDEuMTg5LS4xMTdsLTQuNjU3IDQuNjU2Yy0uOTc1Ljk3Ni0yLjI1NSAxLjQ2NC0zLjUzNSAxLjQ2NC0xLjI4IDAtMi41Ni0uNDg4LTMuNTM1LTEuNDY0LTEuOTUyLTEuOTUxLTEuOTUyLTUuMTIgMC03LjA3MWw0Ljk5OC00Ljk5OGMuOTc1LS45NzYgMi4yNTYtMS40NjQgMy41MzYtMS40NjQgMS4yNzkgMCAyLjU2LjQ4OCAzLjUzNSAxLjQ2NC40OTMuNDkzLjg2MSAxLjA2MyAxLjEwNSAxLjY3MmwtLjc4Ny43ODR6bS01LjcwMy4xNDdjLjE3OC42NDMuNTIxIDEuMjUgMS4wMjYgMS43NTYgMS41NjIgMS41NjMgNC4wOTYgMS41NjEgNS42NTYgMGw0Ljk5OS00Ljk5OGMxLjU2My0xLjU2MiAxLjU2My00LjA5NSAwLTUuNjU3LTEuNTYyLTEuNTYyLTQuMDk1LTEuNTYzLTUuNjU3IDBsLTMuODQxIDMuODQxLS4zMzMtLjAwOWMtLjQwNCAwLS44MDIuMDQtMS4xODkuMTE3bDQuNjU2LTQuNjU2Yy45NzUtLjk3NiAyLjI1Ni0xLjQ2NCAzLjUzNi0xLjQ2NCAxLjI3OSAwIDIuNTYuNDg4IDMuNTM1IDEuNDY0IDEuOTUxIDEuOTUxIDEuOTUxIDUuMTE5IDAgNy4wNzFsLTQuOTk5IDQuOTk4Yy0uOTc1Ljk3Ni0yLjI1NSAxLjQ2NC0zLjUzNSAxLjQ2NC0xLjI4IDAtMi41Ni0uNDg4LTMuNTM1LTEuNDY0LS40OTQtLjQ5NS0uODYzLTEuMDY3LTEuMTA3LTEuNjc4bC43ODgtLjc4NXoiLz48L3N2Zz4=" />
                  Learn
                </button>
              </a>
              {/* {course.Course_Title}: <a href={course.URL} target="_blank" rel="noopener noreferrer">Link</a>
              {course.Ratings} , {course.Review_Count},{course.Duration} */}
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
