import * as React from "react";
import { IconPropTypes } from "../propType";

const TickIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.with || 14}
    height={props.height || 11}
    fill="none"
    viewBox="0 0 14 11"
    {...props}
  >
    <path
      fill={props.color || "#fff"}
      d="m13.53 2.03-8 8a.751.751 0 0 1-1.062 0l-3.5-3.5a.751.751 0 1 1 1.063-1.062L5 8.438 12.47.968a.751.751 0 0 1 1.062 1.063l-.001-.001Z"
    />
  </svg>
);

TickIcon.propTypes = IconPropTypes;

export default TickIcon;
