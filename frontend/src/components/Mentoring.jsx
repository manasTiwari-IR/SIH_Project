import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import './styles/Mentoring.css'
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
      <div className="some-block">
        <div className="msg">UNDER DEVELOPMENT</div>
      </div>
    </>
  );
};

export default Mentoring;
