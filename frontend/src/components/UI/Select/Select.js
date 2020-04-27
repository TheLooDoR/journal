import React from "react";
import './Select.scss'

const Select = props => {
    let defaultValue
    if (!props.placeholder) {
        defaultValue = ''
    } else {
        defaultValue = props.defaultValue
    }
    return (
        <div className={`filter-select__wrap ${props.className}`}>
            <select
                className='filter-select'
                name={props.name}
                onChange={props.changeHandler}
                defaultValue={defaultValue}
                disabled={props.disabled}
                required
            >
                {!props.placeholder ? <option disabled value=''>{props.defaultValue}</option> : null}
                {props.options}
            </select>
        </div>
    )
}

export default Select