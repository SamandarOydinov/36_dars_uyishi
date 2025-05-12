import React from "react";
import "./Button.scss";
import { btnTypes, btnSizes } from "./constants";

const Button = (props) => {
  const {
    type = btnTypes.primary,
    size = btnSizes.md,
    children,
    px = 12,
  } = props;

  return (
    <button
      className={`button btn-${type} btn-${size}`}
      style={{ padding: `0 ${px}px 0 ${px}px` }}
    >
      {children}
    </button>
  );
};

export default Button;
