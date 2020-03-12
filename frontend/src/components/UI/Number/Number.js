import React from "react";
import InputNumber from "rc-input-number";
import 'rc-input-number/assets/index.css';
import upArrow from '../../../assets/number-arrow-up.png'
import downArrow from '../../../assets/number-arrow-down.png'

import './Number.scss'

const Number = props => {
    const upHandler = (<img src={upArrow} alt="UP"/>);
    const downHandler = (<img src={downArrow} alt="DOWN"/>);
    return (
        <InputNumber
            className={`CustomNumber ${props.className ? props.className : ''}`}
            min={props.min}
            max={props.max}
            upHandler={upHandler}
            downHandler={downHandler}
            onChange={props.onChange}
            value={props.value}
        />
    )
}

export default Number