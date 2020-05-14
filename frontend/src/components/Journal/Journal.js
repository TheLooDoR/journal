import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import Table from 'react-bootstrap/Table'
import {DropdownButton} from "react-bootstrap";
import Loader from "../UI/Loader/Loader";
import PresentModal from "../PresentModal/PresentModal";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MainButton from "../UI/MainButton/MainButton";
import {addTaskByDate, getTimeData} from "../../actions";
import {connect} from 'react-redux'
import isEmpty from "../../common-js/isEmpty";
import formatDate from "../../common-js/formatDate";
import dropdownIcon from './assets/dropdown-icon.png'
import {Dropdown} from "react-bootstrap";
import CustomSelect from "../UI/Select/CustomSelect";
import AttendanceDoughnut from "../Statistic/AttendanceDoughnut/AttendanceDoughnut";
import ScoreDoughnut from "../Statistic/ScoreDoughnut/ScoreDoughnut";
import formatTime from "../../common-js/formatTime";
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
                time: {}
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
    }

    //set scroll value
    componentDidUpdate(prevProps, prevState, snapshot) {
        const table = this.tableRef.current
        if(table) {
            table.scrollLeft = this.state.scrollValue
        }
    }

    timeChangeHandler(value) {
        const { taskData } = this.state
        this.setState({
            taskData: {
                ...taskData,
                time: value
            }
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
                time: {}
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
            time_id: this.state.taskData.time.id
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
                    <th height={98}  style={{ borderBottom: 'none'}} className='fixed-row number-row'>№</th>
                    <th height={98} style={{ borderBottom: 'none'}} className='fixed-row name-row'>ФИО</th>
                    {
                        this.props.journalDate.map(el => {
                            return (
                                <th height={98} id={`date-${el.date_id} time-${el.time_id}`} key={`${el.date_id}-${el.time_id}`}>{formatDate(el.date)}</th>
                            )
                        })
                    }
                    <th
                        height={98}
                        style={{ borderBottom: 'none'}}
                        className='fixed-row budget-row'
                    >
                        Б/К
                    </th>
                    <th
                        height={98}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row add-row'
                    >
                        {this.props.user.role !== 'admin' && <div className="journal-content__add-btn" onClick={() => this.hideDateModal()}>Добавить</div>}
                        <svg onClick={() => this.hideDateModal()} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14 journal-content__add-btn-icon " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                    </th>
                    <th
                        height={98}
                        style={{ borderBottom: 'none'}}
                        className='fixed-row miss-row'
                    >
                        Всего пропусков
                    </th>
                    <th
                        height={98}
                        style={{ borderBottom: 'none'}}
                        className='fixed-row valid-miss-row'
                    >
                        Пропусков по ув.причине
                    </th>
                    <th
                        height={98}
                        style={{ borderBottom: 'none'}}
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
                                // style={{minWidth: 200}}
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
                        marksAmount={[unsatisfactory, satisfactory, good, excellent]}
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
        const {group, subjectType, subject, errors, journalData, journalDate, journalStudents, journalUser, time, user} = this.props
        const {taskData} = this.state
        if (!group || !subjectType || !subject) {
            return null
        }
        //Adaptive table slider
        // let ml = 27.2, mr = 34.2
        // if (journalDate.length === 2) {
        //     ml += 3
        //     mr += 2
        // } else if ((journalDate.length >= 3) && journalDate.length < 6) {
        //     ml += 4
        //     mr += 3
        // } else if (journalDate.length >= 6) {
        //     mr += 4
        //     ml += 4
        // }
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
                            {user.role !== 'admin' && <MainButton className='search-error__btn' onClick={() => this.hideDateModal()}>Создать журнал</MainButton>}
                        </div>
                        :
                        <div className="Journal">
                            <div className="Journal__title">
                                {user.role === 'admin' ? (`${journalUser.surname} ${journalUser.name.substr(0, 1)}. ${journalUser.patronymic.substr(0, 1)}./`) : null}
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
                            <div ref={this.tableRef} className="Journal__content journal-content" onScroll={this.scrollHandler}>
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
                            <CustomSelect
                                className='journal-add-form__time'
                                label={el => `${formatTime(el.time)}`}
                                value={el => el}
                                options={time}
                                changeHandler={(value) => this.timeChangeHandler(value)}
                                placeholder='Время'
                                disabled={time.length === 0}
                            />

                        </div>
                        <MainButton
                            className='journal-add-form__btn'
                            type='submit'
                            disabled={isEmpty(taskData.time)}
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
        time: state.entities.time
    }
}

export default connect(mapStateToProps)(Journal)