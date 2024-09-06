import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import UserCard from "./UserCard";
import JobPostCard from "./JobPostCard";
const Search = (props) => {
  const { user ,updateUser} = useUser();
  const [dataArray, setDataArray] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(
      `http://localhost:5000/api/addskills/getallusers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      setDataArray(json.userinfos);
    } else {
      props.showAlert("Error in fetching Users", "danger");
    }
  };
  
  const fetchPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/api/jobposting/getjobposts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      setDataArray(json.jobPosts);
    } else {
      props.showAlert("Error in fetching Posts", "danger");
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/');
    }
  }, [updateUser]);
  
  useEffect(() => {
    if (user.isCompany) {
      fetchUsers(); // Fetch users if the user is a company
    } else {
      fetchPosts(); // Fetch job posts if the user is not a company
    }
  }, [user.isCompany]);

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="searchBar"></div>
      <div className="flex flex-wrap">
      {dataArray.map((item) => (
        <div key={item._id}>
          {user.isCompany ? (
            // If fetching users, display user-related fields
              <UserCard item={item} />
          ) : (
            // If fetching job posts, display job post-related fields
              <JobPostCard item={item} />
          )}
        </div>
      ))}
      </div>
    </>
  );
};

export default Search;
