import React from 'react'
import './MainButton.scss'

const MainButton = props => {

    const cls = ['MainButton', props.className]

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
        >
            {props.children}
        </button>
    )
}

export default MainButton