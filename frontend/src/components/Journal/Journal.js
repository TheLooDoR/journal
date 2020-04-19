import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import Table from 'react-bootstrap/Table'
import {DropdownButton} from "react-bootstrap";
import Loader from "../UI/Loader/Loader";
import PresentModal from "../PresentModal/PresentModal";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MainButton from "../UI/MainButton/MainButton";
import {addTaskByDate, getCorpsData, getTimeData} from "../../actions";
import {connect} from 'react-redux'
import isEmpty from "../../common-js/isEmpty";
import formatDate from "../../common-js/formatDate";
import dropdownIcon from './assets/dropdown-icon.png'
import {Dropdown} from "react-bootstrap";
import Number from "../UI/Number/Number";
import Select from "../UI/Select/Select";
import AttendanceDoughnut from "../Statistic/AttendanceDoughnut/AttendanceDoughnut";
import ScoreDoughnut from "../Statistic/ScoreDoughnut/ScoreDoughnut";
import './Journal.scss'

class Journal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showDateModal: false,
            showStatisticModal: false,
            statisticType: null,
            date: new Date(),
            currentStudent: {},
            scrollValue: 0,
            taskData: {
                time: {},
                corp: {},
                hall: null
            },
            statisticData: {
                totalMiss: null,
                totalPresent: null,
                unsatisfactory: null,
                satisfactory: null,
                good: null,
                excellent: null
            }
        }
    }

    tableRef = React.createRef()

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getTimeData())
        dispatch(getCorpsData())
    }

    //set scroll value
    componentDidUpdate(prevProps, prevState, snapshot) {
        const table = this.tableRef.current
        if(table) {
            table.scrollLeft = this.state.scrollValue
        }
    }

    changeHandler (e) {
        if (e.target.value !== 'DEFAULT') {
            let taskData = this.state.taskData
            this.setState({
                taskData: {...taskData, [e.target.name]: JSON.parse(e.target.value)}
            })
        }
    }

    hallChangeHandled = (e) => {
        let taskData = this.state.taskData
        this.setState({
            taskData: {...taskData, hall: e}
        })
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
            showDateModal: !this.state.showDateModal,
            taskData: {
                time: {},
                corp: {},
                hall: null
            }
        })
    }

    hideStatisticModal(type) {
        let totalMiss = 0, totalPresent = 0, unsatisfactory = 0, satisfactory = 0, good = 0, excellent = 0
        const {journalStudents, journalData} = this.props
        journalStudents.map(student => {
            journalData.map(el => {
                if (el.student_id === student.id) {
                    el.present ? totalPresent++ : totalMiss++
                    if (el.score) {
                        if (el.score >= 0 && el.score <= 59) {
                            unsatisfactory++
                        } else if (el.score >= 60 && el.score <= 74) {
                            satisfactory++
                        } else if (el.score >= 75 && el.score <= 89) {
                            good++
                        } else {
                            excellent++
                        }
                    }
                }
                return null
            })
            return null
        })
        let {statisticData} = this.state
        this.setState({
            showStatisticModal: !this.state.showStatisticModal,
            statisticType: type,
            statisticData: {
                ...statisticData,
                totalMiss,
                totalPresent,
                unsatisfactory,
                satisfactory,
                good,
                excellent
            }
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
            group_id: group.id,
            time_id: this.state.taskData.time.id,
            corps_id: this.state.taskData.corp.id,
            hall: this.state.taskData.hall
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
                                <th height={97} id={`date-${el.date_id} time-${el.time_id}`} key={`${el.date_id}-${el.time_id}`}>{formatDate(el.date)}</th>
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
                                    //return if student is missing
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

    renderStatistic () {
        const {totalPresent, totalMiss, unsatisfactory, satisfactory, good, excellent} = this.state.statisticData
        if (this.state.statisticType === 'score') {
            return (
                <div className="statistic-modal statistic-modal--score">
                    <ScoreDoughnut
                        marksAmmount={[unsatisfactory, satisfactory, good, excellent]}
                    />
                </div>
            )
        } else if (this.state.statisticType === 'attendance') {
            return (
                <div className="statistic-modal statistic-modal--attendance">
                    <AttendanceDoughnut
                        present={totalPresent}
                        miss={totalMiss}
                    />
                </div>

            )
        }
    }

    render() {
        const {group, subjectType, subject, errors, journalData, journalDate, journalStudents, time, corps} = this.props
        const {taskData} = this.state
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
        let missAmount = 0
        let validMissAmount = 0
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
                                <DropdownButton
                                    title={<img src={dropdownIcon} alt="More"/>}
                                    className='Journal__dropdown'
                                    alignRight
                                    id='journal-dropdown-btn'
                                    onSelect={(e) => this.hideStatisticModal(e)}
                                >
                                    <Dropdown.Item eventKey={'score'}>Статистика успеваемости студентов</Dropdown.Item>
                                    <Dropdown.Item eventKey={'attendance'}>Статистика посещаемости студентов</Dropdown.Item>
                                </DropdownButton>
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
                <Modal onClose={() => this.hideDateModal()} open={this.state.showDateModal} modalId='date-modal' center animationDuration={250}>
                    <form className="journal-add-form" onSubmit={e => this.addTaskHandler(e)}>
                        <Calendar
                            onChange={this.dateChangeHandler}
                            value={this.state.date}
                            locale='ru'
                            formatLongDate={(date) => formatDate(date)}
                        />
                        <div className="journal-add-form__place-time">
                            <Select
                                className='journal-add-form__time'
                                name='time'
                                changeHandler={(e) => this.changeHandler(e)}
                                defaultValue='Время'
                                disabled={time.length === 0}
                                options={time.map((el) => {
                                    return (
                                        <option key={el.id} value={JSON.stringify(el)}>{el.time}</option>
                                    )
                                })}
                            />
                            <Select
                                className='journal-add-form__corp'
                                name='corp'
                                changeHandler={(e) => this.changeHandler(e)}
                                defaultValue='Корпус'
                                disabled={corps.length === 0}npm run dev
                                options={corps.map((el) => {
                                    return (
                                        <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                    )
                                })}
                            />
                            <div className="journal-add-form__hall filter-select-warp">
                                <Number
                                    className='journal-add-form__number'
                                    placeholder='Аудитория'
                                    name='hall'
                                    value={this.state.taskData.hall}
                                    onChange={ e => this.hallChangeHandled(e) }
                                />
                            </div>

                        </div>
                        <MainButton
                            className='journal-add-form__btn'
                            type='submit'
                            disabled={isEmpty(taskData.time) || isEmpty(taskData.corp) || !taskData.hall}
                        >
                            Добавить
                        </MainButton>
                    </form>
                </Modal>
                <Modal onClose={() => this.hideStatisticModal()} open={this.state.showStatisticModal} modalId='statistic-modal' center animationDuration={250}>
                    {this.state.statisticType ?
                        <div className="statistic-modal__wrap Journal__statistic">
                            <h3 className='statistic-modal__title'>
                                {
                                    `Статистика ${this.state.statisticType === 'attendance' ? 'посещаемости' : 'успеваемости'} 
                                    группы с ${formatDate(journalDate[0].date)} по ${formatDate(journalDate[journalDate.length - 1].date)}`
                                }
                            </h3>
                            {this.renderStatistic()}
                            {this.state.statisticType === 'attendance' ?
                                <table className='statistic-modal__table'>
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>ФИО</th>
                                            <th>Все</th>
                                            <th>Уваж.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {journalStudents.map((student, index) => {
                                        missAmount = 0
                                        validMissAmount = 0
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {`${student.surname} ${student.name} ${student.patronymic}`}
                                                </td>
                                                {journalData.map((el, index) => {
                                                    if (el.student_id === student.id) {
                                                        //Counting miss amount
                                                        if (!el.present) {
                                                            missAmount++
                                                            if (el.valid_miss) {
                                                                validMissAmount++
                                                            }
                                                        }

                                                    }
                                                    return null
                                                })}
                                                <td>{missAmount}</td>
                                                <td>{validMissAmount}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                : null
                            }
                        </div>
                        : null}
                </Modal>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        time: state.entities.time,
        corps: state.entities.corps
    }
}

export default connect(mapStateToProps)(Journal)