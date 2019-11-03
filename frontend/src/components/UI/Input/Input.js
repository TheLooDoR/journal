import React from 'react'
import classes from './Input.css'
import classnames from "classnames";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}


const Input = props => {


    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={props.type}
                id={props.htmlFor}
                value={props.value}
                onChange ={props.onChange}
                className ={inputCls.join(' ')}
                name ={props.name}
            />

            
        </div>
    )
}

export default Input