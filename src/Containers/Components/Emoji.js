import React from 'react';

export default (props) => 
    <span role="img" aria-label={props.label} className={props.className}>
        {props.emoji}
    </span>;