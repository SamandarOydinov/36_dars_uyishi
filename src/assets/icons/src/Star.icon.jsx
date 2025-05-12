import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 19}
    height={props.height || 17}
    fill="none"
    {...props}
  >
    <path
      fill={props.color || "#FFC633"}
      d="m9.245.255 2.62 5.64 6.172.748-4.554 4.234 1.196 6.102-5.434-3.023-5.434 3.023 1.196-6.102L.452 6.643l6.174-.748L9.245.255Z"
    />
  </svg>
);
export default SvgComponent;
