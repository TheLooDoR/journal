import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import Table from 'react-bootstrap/Table'
import {DropdownButton} from "react-bootstrap";
import Loader from "../UI/Loader/Loader";
import PresentModal from "../PresentModal/PresentModal";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MainButton from "../UI/MainButton/MainButton";
import {
    addTaskByDate,
    getTimeData,
    requestJournalData,
    requestJournalDataFinished, SET_JOURNAL_PARAMETERS,
    setJournalData
} from "../../actions";
import {connect} from 'react-redux'
import isEmpty from "../../common-js/isEmpty";
import formatDate from "../../common-js/formatDate";
import dropdownIcon from './assets/dropdown-icon.png'
import {Dropdown} from "react-bootstrap";
import CustomSelect from "../UI/Select/CustomSelect";
import AttendanceDoughnut from "../Statistic/AttendanceDoughnut/AttendanceDoughnut";
import ScoreDoughnut from "../Statistic/ScoreDoughnut/ScoreDoughnut";
import formatTime from "../../common-js/formatTime";
import Axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Journal.scss'

ReactHTMLTableToExcel.format = (s, c) => {
    // If there is a table in the data object
    if (c && c['table']) {
        // Get the table HTML
        const html = c.table;

        // Create a DOMParser object
        const parser = new DOMParser();

        // Parse the table HTML and create a text/html document
        const doc = parser.parseFromString(html, 'text/html');

        // Get all table rows
        const rows = doc.querySelectorAll('tr');
        // For each table row remove the first child (th or td)
        for (const row of rows) {
            const columns = row.querySelectorAll('th, td')
            for (const column of columns) {
                if (column.hasAttribute('not_to_excel')) {
                    column.remove()
                }
            }
            row.removeChild(row.firstChild);
        }

        // Save the manipulated HTML table code
        c.table = doc.querySelector('table').outerHTML;
    }

    return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

class Journal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showDateModal: false,
            showStatisticModal: false,
            showDeleteTaskModal: false,
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
            },
            deleteTaskData: {}
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
        this.props.dispatch({
            type: SET_JOURNAL_PARAMETERS,
            payload: {}
        })
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
        if (type !== 'export') {
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

    hideDeleteTaskModal(data=null) {
        if (!this.state.showDeleteTaskModal) {
            this.setState({
                deleteTaskData: data
            })
        }
        this.setState({
            showDeleteTaskModal: !this.state.showDeleteTaskModal
        })
    }

    deleteTaskHandler(e) {
        e.preventDefault()

        const { dispatch, group, subjectType, subject, user } = this.props
        const { date_id, time_id } = this.state.deleteTaskData
        const params = {
            group_id: group.id,
            subject_id: subject.id,
            type_id: subjectType.id,
            date_id,
            time_id
        }
        this.hideDeleteTaskModal()
        dispatch(requestJournalData())
        Axios.delete('api/journal/delete-task-by-date', { params })
            .then(() => {
                const isAdmin = user.role === 'admin'
                const journalParameters = {
                    group_id: group.id,
                    subject_id: subject.id,
                    type_id: subjectType.id,
                    user_id: user.userId,
                    isAdmin
                }
                dispatch(setJournalData(journalParameters))
            })
            .catch(err => {
                dispatch(requestJournalDataFinished())
                console.log(err.response.data)
            })
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
                                    <th height={97} id={`date-${el.date_id} time-${el.time_id}`} key={`${el.date_id}-${el.time_id}`} className='Journal__date-column'>
                                        <DropdownButton
                                            title={formatDate(el.date)}
                                            className='Journal__delete-dropdown'
                                            alignRight
                                            id='journal-dropdown-btn'
                                            onSelect={() => this.hideDeleteTaskModal(el)}
                                            disabled={this.props.user.role === 'admin'}
                                        >
                                            <Dropdown.Item eventKey={'score'}>Удалить</Dropdown.Item>
                                        </DropdownButton>
                                    </th>
                            )
                        })
                    }
                    <th
                        height={98}
                        style={{top: 56, borderBottom: 'none'}}
                        className='fixed-row budget-row'
                        not_to_excel='true'
                    >
                        Б/К
                    </th>
                    <th
                        height={98}
                        style={{borderBottom: 'none', top: 56}}
                        className='fixed-row add-row'
                        not_to_excel='true'
                    >
                        {this.props.user.role !== 'admin' && <div className="journal-content__add-btn" onClick={() => this.hideDateModal()}>Добавить</div>}
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
                            <td className='journal-content__budget fixed-row budget-row' not_to_excel='true'>{student.budget ? 'Б': 'К'}</td>
                            {/*empty column for add btn*/}
                            <td className='journal-content__add fixed-row add-row' not_to_excel='true'/>
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
                            {user.role !== 'admin' && <MainButton className='search-error__btn' onClick={() => this.hideDateModal()}>Создать журнал</MainButton>}
                        </div>
                        :
                        <div className="Journal">
                            <div className="Journal__title">
                                {user.role === 'admin' ? (`${journalUser} `) : null}
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
                                    <Dropdown.Item eventKey='export'>

                                        {/*<ReactExport.ExcelFile>*/}

                                        {/*        <ReactExport.ExcelColumn label='ФИО' value='name'/>*/}
                                        {/*        <ReactExport.ExcelColumn label='ФИО' value='surname'/>*/}

                                        {/*</ReactExport.ExcelFile>*/}
                                        <ReactHTMLTableToExcel
                                            table='journal-table'
                                            id='journal-table-export-btn'
                                            filename={`${group.name}, ${subjectType.name}, ${subject.name}`}
                                            sheet={`${group.name}, ${subjectType.name}, ${subject.name}`}
                                            buttonText='Экспорт в Excel'
                                        />
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div ref={this.tableRef} className="Journal__content journal-content" style={{marginLeft: ml, marginRight: mr}} onScroll={this.scrollHandler}>
                                <Table bordered className='journal-content__table' id='journal-table'>
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
                                                {journalData.map((el) => {
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
                { !isEmpty(this.state.deleteTaskData) &&
                    <Modal onClose={ () => this.hideDeleteTaskModal() } open={this.state.showDeleteTaskModal} center animationDuration={250} showCloseIcon={false}>
                        <form className="admin-delete" onSubmit={ e => this.deleteTaskHandler(e) }>
                            <p className='admin-delete__text'>
                                Вы уверены что хотите удалить занятие
                                <span>{`${formatDate(this.state.deleteTaskData.date)}, ${formatTime(this.state.deleteTaskData.time)}, 
                                ${this.props.subjectType.name}, ${this.props.subject.full_name}, ${this.props.group.name}`}?</span>
                            </p>
                            <div className="admin-delete__buttons">
                                <button className="admin-delete__btn" onClick={(e) => {
                                    e.preventDefault()
                                    this.hideDeleteTaskModal()
                                }}>Нет</button>
                                <button className="admin-delete__btn" type='submit'>Да</button>
                            </div>
                        </form>
                    </Modal>
                    }
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