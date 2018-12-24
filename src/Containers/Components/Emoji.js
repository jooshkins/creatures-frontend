import React from 'react';

export default (props) => 
    <span 
    role="img" 
    aria-label={props.label} 
    aria-hidden="false" 
    className={props.className}
    style={{
        minWidth: props.minWidth, 
        display: props.minWidth ? "inline-block" : ""
    }}
    >
        {props.emoji}
    </span>;