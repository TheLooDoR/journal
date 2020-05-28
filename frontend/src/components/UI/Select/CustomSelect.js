import React from "react";
import Select from "react-select";
import './CustomSelect.scss'

const CustomSelect = props => {

    return (
        <div className={`filter-select__wrap ${props.className ? props.className : ''}`}>
            <Select
                className='filter-select'
                classNamePrefix='react-select'
                getOptionLabel={props.label}
                getOptionValue={props.value}
                options={props.options}
                onChange={ props.changeHandler }
                isSearchable={props.isSearchable}
                placeholder={props.placeholder}
                isLoading={props.isLoading}
                isDisabled={props.disabled}
                noOptionsMessage={() => 'Не найдено'}
                defaultValue={props.defaultValue}
            />
        </div>
    )
}

export default CustomSelect