import React from "react";
import './Select.scss'

const Select = props => {

    return (
        <div className={`filter-select__wrap ${props.className}`}>
            <select
                className='filter-select'
                name={props.name}
                onChange={props.changeHandler}
                defaultValue={'DEFAULT'}
                disabled={props.disabled}
            >
                <option disabled value='DEFAULT'>{props.defaultValue}</option>
                {props.options}
            </select>
        </div>
    )
}

export default Select