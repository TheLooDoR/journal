import React from "react";
import { connect } from 'react-redux'
import './UserSchedule.scss'
import formatDate from "../../common-js/formatDate";
import formatTime from "../../common-js/formatTime";

const UserSchedule = props => {

    function renderTableBody(array) {

        return array.map((el, index, array) => {
            const prev = array[index - 1]
            const next = array[index + 1]
            //teacher has different subject on first and second week
            //check next item
            if (index !== array.length - 1 && el.time === next.time) {
                return (
                    <tr key={+new Date() + Math.random()}>
                        <td rowSpan={2}>{formatTime(el.time)}</td>
                        <td>{el.group}</td>
                        <td style={{ wordBreak: 'break-word'}}>{el.subject}</td>
                        <td>{el.subject_type}</td>
                        <td>{`${el.hall}, ${el.corp}`}</td>
                    </tr>
                )
            }
            //check prev item
            if (index !== 0 && el.time === prev.time) {
                return (
                    <tr key={+new Date() + Math.random()}>
                        <td>{el.group}</td>
                        <td style={{ wordBreak: 'break-word'}}>{el.subject}</td>
                        <td>{el.subject_type}</td>
                        <td>{`${el.hall}, ${el.corp}`}</td>
                    </tr>
                )
            }
            //if user has one subject on first or second week
            if (((index !== array.length - 1 && index !== 0) && (el.time !== next.time && el.time !== prev.time)) ||
                ((index === array.length - 1 && array.length !== 1) && (el.time !== prev.time)) ||
                (index === 0 && array.length !== 1 && el.time !== next.time) || (index === 0 && array.length === 1)) {
                if (!el.first_week) {
                    return (
                        <React.Fragment key={+new Date() + Math.random()}>
                            <tr key={+new Date() + Math.random()}>
                                <td rowSpan={2}>{formatTime(el.time)}</td>
                                <td className='time-table__empty-row'/>
                                <td className='time-table__empty-row'/>
                                <td className='time-table__empty-row'/>
                                <td className='time-table__empty-row'/>
                            </tr>
                            <tr key={+new Date() + Math.random()}>
                                <td>{el.group}</td>
                                <td style={{ wordBreak: 'break-word'}}>{el.subject}</td>
                                <td>{el.subject_type}</td>
                                <td>{`${el.hall}, ${el.corp}`}</td>
                            </tr>
                        </React.Fragment>
                    )
                } else if (!el.second_week) {
                    return (
                        <React.Fragment key={+new Date() + Math.random()}>
                            <tr key={+new Date() + Math.random()}>
                                <td rowSpan={2}>{formatTime(el.time)}</td>
                                <td>{el.group}</td>
                                <td style={{ wordBreak: 'break-word'}}>{el.subject}</td>
                                <td>{el.subject_type}</td>
                                <td>{`${el.hall}, ${el.corp}`}</td>
                            </tr>
                            <tr key={index + Math.random() * 10}>
                                <td className='time-table__empty-row'/>
                                <td className='time-table__empty-row'/>
                                <td className='time-table__empty-row'/>
                                <td className='time-table__empty-row'/>
                            </tr>
                        </React.Fragment>
                    )
                }
            }
            return (
                <tr key={+new Date() + Math.random()}>
                    <td>{formatTime(el.time)}</td>
                    <td>{el.group}</td>
                    <td>{el.subject}</td>
                    <td style={{ wordBreak: 'break-word'}}>{el.subject_type}</td>
                    <td>{`${el.hall}, ${el.corp}`}</td>
                </tr>
            )
        })
    }

    const { schedule } = props
    //get dates for table titles
    const todayDate = new Date()
    let tomorrowDate = new Date()
    tomorrowDate.setDate(new Date().getDate() + 1)
    //empty rows if amount is less then 5
    let emptyRows = {
        today: [],
        tomorrow: []
    }
    if (schedule.todaySchedule.length < 5) {
        let missAmount = 5 - schedule.todaySchedule.length
        for (let i = 0; i < missAmount; i++) {
            emptyRows.today.push(
                <tr key={+new Date() + Math.random()}>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                </tr>
            )
        }
    }
    if (schedule.tomorrowSchedule.length < 5) {
        let missAmount = 5 - schedule.tomorrowSchedule.length
        for (let i = 0; i < missAmount; i++) {
            emptyRows.tomorrow.push(
                <tr key={+new Date() + Math.random()}>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                    <td className='time-table__empty-row'/>
                </tr>
            )
        }
    }
    return (
        <div className="time-table__wrap">
            <div className="Home__time-table time-table">
                <h2 className="time-table__title">Рассписание на сегодня ({formatDate(todayDate)})</h2>
                <div className="time-table__border">
                    <table>
                        <thead>
                        <tr>
                            <th>Время</th>
                            <th>Группа</th>
                            <th>Дисциплина</th>
                            <th>Тип занятия</th>
                            <th>Аудит.</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            renderTableBody(schedule.todaySchedule)
                        }
                        {emptyRows.today.length === 0 ? null : emptyRows.today.map((el) => {
                            return el
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="Home__time-table time-table">
                <h2 className="time-table__title">Рассписание на завтра ({formatDate(tomorrowDate)})</h2>
                <div className="time-table__border">
                    <table>
                        <thead>
                        <tr>
                            <th>Время</th>
                            <th>Группа</th>
                            <th>Дисциплина</th>
                            <th>Тип занятия</th>
                            <th>Аудит.</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            renderTableBody(schedule.tomorrowSchedule)
                        }
                        {emptyRows.tomorrow.length === 0 ? null : emptyRows.tomorrow.map((el) => {
                            return el
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        schedule: state.schedule
    }
}

export default connect(mapStateToProps)(UserSchedule)