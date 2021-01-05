import React from "react";
import "./userCard.css";

export const UserCard = ({ navigateToRoute, name, image, id }) => (
  <div className="user-card" onClick={() => navigateToRoute(`/${id}`)}>
    <div className="user-card-image">
      <img src={image} alt="User" />
    </div>
    <h4 className="user-card-name"> {name} </h4>{" "}
  </div>
);
