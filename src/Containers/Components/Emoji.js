import React from 'react';

export default (props) => 
    <span role="img" aria-label={props.label} aria-hidden="false" className={props.className}>
        {props.emoji}
    </span>;