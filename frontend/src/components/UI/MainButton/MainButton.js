import React from 'react'
import './MainButton.scss'

const MainButton = props => {

    const cls = ['MainButton', props.className]

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default MainButton