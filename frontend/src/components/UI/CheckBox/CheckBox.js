import React from "react";
import './CheckBox.scss'

const Checkbox = props => {

    return (
        <div className={`CheckBox ${props.className ? props.className : ''}`} style={props.style}>
            <input
                type="checkbox"
                disabled={props.disabled}
                checked={props.checked}
                readOnly={props.readOnly}
                name={props.name}
                onChange={props.changeHandler}
            />
            {props.label && <span className="CheckBox__label">{props.label}</span>}
        </div>
    )

}

export default Checkbox