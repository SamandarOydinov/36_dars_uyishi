import React from "react";
import "./MainTitle.scss";

const MainTitle = ({ title }) => {
  if (!title) {
    return null;
  }
  return <h3>{title}</h3>;
};

export default MainTitle;
