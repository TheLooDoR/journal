import React from "react";
import './NotFound.scss'

const NotFound = props => {

    return (
        <div className='NotFound'>
            <h1 className="NotFound__title">Страница не найдена</h1>
            <p>Ошибка 404. Адрес, по которому вы пытаетесь перейти не существует.</p>
        </div>
    )
}

export default NotFound