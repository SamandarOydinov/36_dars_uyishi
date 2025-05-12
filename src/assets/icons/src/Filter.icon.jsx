import PropTypes from "prop-types"
import * as React from "react"
import { IconPropTypes } from "../propType"

const FilterIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 24}
        height={props.height || 25}
        fill="none"
        viewBox="0 0 24 25"
        {...props}
    >
        <path
            fill={props.color || "#000"}
            fillOpacity={props.opacity || 0.4}
            d="M13.125 12.125v8.625a1.125 1.125 0 1 1-2.25 0v-8.625a1.125 1.125 0 1 1 2.25 0ZM18.75 18.5a1.125 1.125 0 0 0-1.125 1.125v1.125a1.125 1.125 0 1 0 2.25 0v-1.125A1.125 1.125 0 0 0 18.75 18.5ZM21 14.75h-1.125V4.25a1.125 1.125 0 1 0-2.25 0v10.5H16.5a1.125 1.125 0 1 0 0 2.25H21a1.125 1.125 0 1 0 0-2.25Zm-15.75.75a1.125 1.125 0 0 0-1.125 1.125v4.125a1.125 1.125 0 0 0 2.25 0v-4.125A1.125 1.125 0 0 0 5.25 15.5Zm2.25-3.75H6.375v-7.5a1.125 1.125 0 0 0-2.25 0v7.5H3A1.125 1.125 0 1 0 3 14h4.5a1.125 1.125 0 1 0 0-2.25Zm6.75-4.5h-1.125v-3a1.125 1.125 0 1 0-2.25 0v3H9.75a1.125 1.125 0 0 0 0 2.25h4.5a1.125 1.125 0 0 0 0-2.25Z"
        />
    </svg>
)

FilterIcon.propTypes = IconPropTypes;

export default FilterIcon
