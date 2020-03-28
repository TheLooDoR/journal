import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import Table from 'react-bootstrap/Table'
import Loader from "../UI/Loader/Loader";
import PresentModal from "../PresentModal/PresentModal";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MainButton from "../UI/MainButton/MainButton";
import {addTaskByDate} from "../../actions";
import {connect} from 'react-redux'
import isEmpty from "../../common-js/isEmpty";
import formatDate from "../../common-js/formatDate";

import './Journal.scss'

class Journal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showDateModal: false,
            date: new Date(),
            currentStudent: {},
            scrollValue: 0
        }
    }

    tableRef = React.createRef()

    //set scroll value
    componentDidUpdate(prevProps, prevState, snapshot) {
        const table = this.tableRef.current
        if(table) {
            table.scrollLeft = this.state.scrollValue
        }
    }

    scrollHandler = () => {
        const table = this.tableRef.current
        if(table) {
            this.setState({
                scrollValue: table.scrollLeft
            })
        }
    }

    hideJournalModal = () => {
        this.setState({
            scrollValue: 0
        })
        this.props.onHide()
    }

    hidePresentModal = (student) => {
        this.setState({
            showModal: !this.state.showModal,
            currentStudent: student
        })
    }

    hideDateModal() {
        this.setState({
            showDateModal: !this.state.showDateModal
        })
    }

    dateChangeHandler = date => {
        this.setState({
            date
        })
    }

    addTaskHandler(e) {
        e.preventDefault()
        const {dispatch, user, subject, subjectType, group} = this.props
        const taskData = {
            date: this.state.date,
            user_id: user.userId,
            subject_id: subject.id,
            type_id: subjectType.id,
            group_id: group.id
        }
        dispatch(addTaskByDate(taskData))
        this.hideDateModal()
    }

    calculateTotalGrades(grades) {
        let sum = 0
        for (let i = 0; i < grades.length; i++) {
            sum += grades[i]
        }
        return sum / grades.length
    }

    renderTableHead() {
        return (
            <thead>
                <tr className='journal-content__title'>
                    <th height={98}  style={{top: 56, borderBottom: 'none'}} className='fixed-row number-row'>№</th>
                    <th height={98} style={{top: 56, borderBottom: 'none'}} className='fixed-row name-row'>ФИО</th>
                    {
                        this.props.journalDate.map(el => {
                            return (
                                <th height={97} id={`date ${el.id}`} key={el.id}>{formatDate(el.date)}</th>
                            )
                        })
                    }
                    <th
                        height={98}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row budget-row'
                    >
                        Б/К
                    </th>
                    <th
                        height={98}
                        onClick={() => this.hideDateModal()}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row add-row'
                    >
                        <div className="journal-content__add-btn">Добавить</div>
                    </th>
                    <th
                        height={98}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row miss-row'
                    >
                        Всего пропусков
                    </th>
                    <th
                        height={98}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row valid-miss-row'
                    >
                        Пропусков по ув.причине
                    </th>
                    <th
                        height={98}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row total-grades-row'
                    >
                        Итоговые оценки
                    </th>
                </tr>
            </thead>
        )
    }

    renderTableBody () {
        let missAmount = 0
        let validMissAmount = 0
        let grades = []
        return (
            <tbody>
            {
                this.props.journalStudents.map((student, index) => {
                    missAmount = 0
                    validMissAmount = 0
                    grades = []
                    return (
                        <tr key={student.id}>
                            {/*Number list */}
                            <td className='fixed-row number-row'>{index + 1}</td>
                            {/*Student Name*/}
                            <td
                                className='fixed-row name-row'
                                style={{minWidth: 200}}
                            >
                                {`${student.surname} ${student.name.substr(0, 1)}. ${student.patronymic.substr(0, 1)}.`}
                            </td>
                            {this.props.journalData.map((el, index) => {
                                if (el.student_id === student.id) {
                                    //Counting miss amount
                                    if (!el.present) {
                                        missAmount++
                                        if (el.valid_miss) {
                                            validMissAmount++
                                        }
                                    }
                                    //Adding grades to grades array
                                    if (el.score !== null) {
                                        grades.push(el.score)
                                    }
                                    //return if students is missing
                                    return (
                                        <td
                                            id={`date-${el.date_id}-student-${el.student_id}`}
                                            key={index}
                                            onDoubleClick={() => this.hidePresentModal(el)}
                                            className='journal-content__presents'
                                        >
                                            {el.present ? el.score ? el.score : '' : 'н'}
                                        </td>
                                    )
                                }
                                return null
                            })}
                            {/*budget column*/}
                            <td className='journal-content__budget fixed-row budget-row'>{student.budget ? 'Б': 'К'}</td>
                            {/*empty column for add btn*/}
                            <td className='journal-content__add fixed-row add-row'/>
                            {/*miss amount*/}
                            <td id={`amount-${student.id}`} className='fixed-row miss-row'>{missAmount}</td>
                            {/*valid miss amount*/}
                            <td id={`valid-miss-amount${student.id}`} className='fixed-row valid-miss-row'>{validMissAmount}</td>
                            {/*total grades*/}
                            <td
                                className='journal-content__total-grades fixed-row total-grades-row'
                            >
                                {grades.length === 0 ? '': Math.round(this.calculateTotalGrades(grades))}
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }

    render() {
        const {group, subjectType, subject, errors, journalData, journalDate} = this.props
        if (!group || !subjectType || !subject) {
            return null
        }
        //Adaptive table slider
        let ml = 247, mr = 517
        if (journalDate.length === 2) {
            ml += 3
            mr += 2
        } else if ((journalDate.length >= 3) && journalDate.length < 6) {
            ml += 4
            mr += 3
        } else if (journalDate.length >= 6) {
            mr += 4
            ml += 4
        }
        return (
            <Modal
                onClose={this.hideJournalModal}
                open={this.props.show}
                modalId={isEmpty(journalData) ? 'journal-modal-error' : 'journal-modal'}
                center
                animationDuration={250}
            >
                {this.props.isLoading ? <Loader/> :
                    isEmpty(journalData) ?
                        <div className='search-error'>
                            <h2>{errors.search}</h2>
                            <MainButton className='search-error__btn' onClick={() => this.hideDateModal()}>Создать журнал</MainButton>
                        </div>
                        :
                        <div className="Journal">
                            <div className="Journal__title">
                                {group.name}/{subjectType.name}/{subject.name}
                            </div>
                            <div ref={this.tableRef} className="Journal__content journal-content" style={{marginLeft: ml, marginRight: mr}} onScroll={this.scrollHandler}>
                                <Table bordered className='journal-content__table'>
                                    {this.renderTableHead()}
                                    {this.renderTableBody()}
                                </Table>
                            </div>
                            <PresentModal
                                show={this.state.showModal}
                                onHide={this.hidePresentModal}
                                student = {this.state.currentStudent}
                                center={true}
                                scrollHandler={this.scrollHandler}
                            />
                        </div>
                }
                <Modal onClose={() => this.hideDateModal()} open={this.state.showDateModal} modalId='date-modal' center>
                    <form className="journal-add-form" onSubmit={e => this.addTaskHandler(e)}>
                        <Calendar
                            onChange={this.dateChangeHandler}
                            value={this.state.date}
                            locale='ru'
                            formatLongDate={(date) => formatDate(date)}
                        />
                        <MainButton className='journal-add-form__btn' type='submit'>Добавить</MainButton>
                    </form>
                </Modal>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Journal)