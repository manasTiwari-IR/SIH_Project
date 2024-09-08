import React from "react";
import './styles/JobCard.css'
const JobPostCard = (props) => {
  return (
    <div className="card111">
      <div className="company_logo">
        {(props.item.CompanyLogo)?
        <img src={props.item.CompanyLogo} alt="" />:
        <img src="./src/assets/icons8-male-user-50.png" alt="" />}
        <span>{props.item.CompanyName}</span>
      </div>
      <div><span>Description: </span>{props.item.description}</div>
      <div><span>Location: </span>{props.item.joblocation}</div>
      <div><span>Contact email: </span>{props.item.contactEmail}</div>
      <div><span>Contact number: </span>{props.item.contactNumber}</div>
    </div>
  );
};
export default JobPostCard;
