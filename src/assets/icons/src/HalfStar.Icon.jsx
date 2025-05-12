import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 9}
    height={props.height || 17}
    fill="none"
    {...props}
  >
    <path
      fill={props.color || "#FFC633"}
      d="M3.566 16.98 9 13.955V.255l-2.62 5.64-6.172.748 4.554 4.234-1.196 6.102Z"
    />
  </svg>
);
export default SvgComponent;
