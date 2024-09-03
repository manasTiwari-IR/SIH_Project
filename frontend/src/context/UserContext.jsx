// UserContext.js
import React, { createContext, useState, useContext } from 'react';
import userImage from "../assets/icons8-male-user-50.png";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Some user",
    email: "user@example.com",
    number: 9999999999,
    imageUrl: userImage,
    isCompany:false,
  });

  const updateUser = async () => {
    if(!localStorage.getItem('token'))return;
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AuthToken": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json) {
      const updatedUser = {
        name: json.name,
        email: json.email,
        number:json.number,
        imageUrl:(json.profilephoto)?json.profilephoto:userImage,
        isCompany:json.isCompany,
      }
      setUser(updatedUser);
    } else {
       console.log("user not found");
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
  