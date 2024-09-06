import React from "react";
import './styles/JobCard.css'
const JobPostCard = (props) => {
  return (
    <div className="card">
      <div ><span>Company :</span>{props.item.CompanyName}</div>
      <div><span>Description :</span>{props.item.description}</div>
      <div><span>Location :</span>{props.item.joblocation}</div>
      <div><span>Contact email :</span>{props.item.contactEmail}</div>
      <div><span>Contact No. :</span>{props.item.contactNumber}</div>
    </div>
  );
};
export default JobPostCard;
