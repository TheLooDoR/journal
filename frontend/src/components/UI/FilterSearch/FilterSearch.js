import React from "react";
import './FilterSearch.scss'

const FilterSearch = props => {

    return (
        <div className={`FilterSearch ${props.className ? props.className : ''}`}>
            <input
                type="text"
                style={{ height: props.height }}
                className='FilterSearch__input'
                placeholder='Поиск'
                name={props.inputName}
                onChange={props.changeHandler}
            />
            <div className='FilterSearch__select-wrap'>
                <select
                    name={props.selectName}
                    id=""
                    style={{ height: props.height }}
                    className='FilterSearch__select'
                    defaultValue={props.defaultValue}
                    onChange={props.changeHandler}
                    value={props.selectValue}
                >
                    {props.options.map((el, index) => {
                        return (
                            <option key={index} value={el.value}>{el.name}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default FilterSearch