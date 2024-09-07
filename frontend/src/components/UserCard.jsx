import React from "react";
import './styles/UserCard.css'
const UserCard = (props) => {
  return (
    <div className="usercard">
      <div className="first">
        <img src={props.item.pfp} alt="" className="pfp"/>
        <div>{props.item.name}</div>
      </div>
      <div className="second"><span className="title ">Contact email :</span>{props.item.email}</div>
      <div className="second mr-24"><span className="title">Contact No. :</span>{props.item.number}</div>
      <div className="second about"><div className="title">About:</div> <div className="desc">{props.item.description}</div></div>
      <div className="title text-xl font-semibold underline">Skills :</div>
      <div className="languages">
      {props.item.ProgrammingLang && props.item.ProgrammingLang.map((lang, index) => (
        <div key={index} className="lang">{lang}</div>
      ))}
      </div>
    </div>
  );
};

export default UserCard;
