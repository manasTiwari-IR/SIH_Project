import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
const Mentoring = () => {
  const navigate=useNavigate();
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
  }, [user]);
  return (
    <>
      <h1>UNDER DEVELOPMENT</h1>
    </>
  );
};

export default Mentoring;
