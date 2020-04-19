import React, { Component } from 'react';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {
    getDepartmentsData,
    getGroupsDataByDepartment,
    getSubjectsData,
    getSubjectTypesData, setJournalData,
    setJournalParameters,
    getUserScheduleData
} from "../../actions";
import MainButton from '../../components/UI/MainButton/MainButton'
import Journal from "../../components/Journal/Journal";
import formatDate from "../../common-js/formatDate";
import Select from "../../components/UI/Select/Select";
import isEmpty from "../../common-js/isEmpty";
import './Home.scss'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            journalData: {
                department: {},
                group: {},
                subjectType: {},
                subject: {}
            },
            showModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDepartmentsData())
        dispatch(getSubjectTypesData())
        dispatch(getSubjectsData())
        dispatch(getUserScheduleData(this.props.user.userId))
    }

    //get groups by department
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.journalData.department !== this.state.journalData.department) {
            this.props.dispatch(getGroupsDataByDepartment(this.state.journalData.department.id))
        }
    }

    changeHandler (e) {
        if (e.target.value !== 'DEFAULT') {
            let journalData = this.state.journalData
            this.setState({
                journalData: {...journalData, [e.target.name]: JSON.parse(e.target.value)}
            })
        }
    }

    clickHandler = () => {
        const { dispatch } = this.props
        const { user } = this.props
        const {journalData} = this.state
        dispatch(setJournalParameters(this.state.journalData))
        const journalParameters = {
            group_id: journalData.group.id,
            subject_id: journalData.subject.id,
            type_id: journalData.subjectType.id,
            user_id: user.userId
        }
        dispatch(setJournalData(journalParameters))
        this.setShowModal()
    }

    setShowModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    renderModal() {
        const { group, subjectType, subject } = this.props.journalParameters
         return (
            <Journal
                show={this.state.showModal}
                onHide={() => this.setShowModal()}
                group={group}
                subjectType={subjectType}
                subject={subject}
                journalData={this.props.journalData}
                journalDate={this.props.journalDate}
                journalStudents={this.props.journalStudents}
                errors={this.props.errors}
                isLoading={this.props.isLoading}
            />
        )
    }

    selectOptions(entity) {
        return entity.map((el) => {
            return (
                <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
            )
        })
    }

    render() {
        const {entities, schedule} = this.props
        const {journalData} = this.state
        if (!entities.subjectTypes || !entities.groups || !entities.subjects || !entities.departments) {
            return (<Loader/>)
        }
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
                    <tr key={i}>
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
                    <tr key={i}>
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
            <div className='Home'>
                <div className="container">
                    <div className="Home__categories">
                        <Select
                            className='Home__departments Home__select'
                            name='department'
                            changeHandler={(e) => this.changeHandler(e)}
                            defaultValue='Кафедра'
                            options={this.selectOptions(entities.departments)}
                        />
                        <Select
                            className='Home__groups Home__select'
                            name='group'
                            changeHandler={(e) => this.changeHandler(e)}
                            defaultValue='Группа'
                            disabled={entities.groups.length === 0}
                            options={this.selectOptions(entities.groups)}
                        />
                        <Select
                            className='Home__subjects Home__select'
                            name='subject'
                            changeHandler={(e) => this.changeHandler(e)}
                            defaultValue='Дисциплина'
                            options={this.selectOptions(entities.subjects)}
                        />
                        <Select
                            className='Home__subject-types Home__select'
                            name='subjectType'
                            changeHandler={(e) => this.changeHandler(e)}
                            defaultValue='Вид занятия'
                            options={this.selectOptions(entities.subjectTypes)}
                        />
                        <MainButton
                            className='Home__btn'
                            onClick={this.clickHandler}
                            disabled={isEmpty(journalData.group) || isEmpty(journalData.subjectType) || isEmpty(journalData.subject)}
                        >
                            Найти
                        </MainButton>
                    </div>
                    <div className="Home__time-table-wrap">
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
                                            schedule.todaySchedule.map((el, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{el.time}</td>
                                                        <td>{el.group}</td>
                                                        <td>{el.subject}</td>
                                                        <td>{el.subject_type}</td>
                                                        <td>{`${el.hall}, ${el.corp}`}</td>
                                                    </tr>
                                                )
                                            })
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
                                        schedule.tomorrowSchedule.map((el, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{el.time}</td>
                                                    <td>{el.group}</td>
                                                    <td>{el.subject}</td>
                                                    <td>{el.subject_type}</td>
                                                    <td>{`${el.hall}, ${el.corp}`}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {emptyRows.tomorrow.length === 0 ? null : emptyRows.tomorrow.map((el) => {
                                        return el
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {this.renderModal()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities: state.entities,
        journalParameters: state.journal.journalParameters,
        journalData: state.journal.journalData,
        journalDate: state.journal.journalDate,
        journalStudents: state.journal.journalStudents,
        user: state.auth.user,
        errors: state.errors,
        isLoading: state.journal.isLoading,
        schedule: state.schedule
    }
}

export default connect(mapStateToProps)(Home)