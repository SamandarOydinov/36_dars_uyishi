import * as React from "react"
import { IconPropTypes } from "../propType"

const ArrowRightIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 7}
        height={props.height || 12}
        fill="none"
        viewBox="0 0 7 12"
        {...props}
    >
        <path
            fill={props.color || "#000"}
            fillOpacity={props.opacity || 0.6}
            d="m1.53.47 5 5a.75.75 0 0 1 0 1.062l-5 5a.751.751 0 1 1-1.062-1.063L4.938 6 .468 1.53A.751.751 0 1 1 1.53.469V.47Z"
        />
    </svg>
)

ArrowRightIcon.propTypes = IconPropTypes

export default ArrowRightIcon
