import React from "react";

import './Radio.scss'

const Radio = props => {
    return (
        <label className='Radio'>{props.label}
            <input
                type="radio"
                name={props.name}
                checked={props.checked}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            <span className='Radio__mark'/>
        </label>
    )
}

export default Radio