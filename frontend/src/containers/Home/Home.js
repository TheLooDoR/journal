import React, { Component } from 'react';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import Axios from "axios";
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
import Select from "../../components/UI/Select/Select";
import isEmpty from "../../common-js/isEmpty";
import ScoreDoughnut from "../../components/Statistic/ScoreDoughnut/ScoreDoughnut";
import AttendanceDoughnut from "../../components/Statistic/AttendanceDoughnut/AttendanceDoughnut";
import UserSchedule from "../../components/UserSchedule/UserSchedule";
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
            statisticsData: {},
            randomUsers: [],
            showModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDepartmentsData())
        dispatch(getSubjectTypesData())
        dispatch(getSubjectsData())
        if (this.props.user.role === 'admin') {
            Axios.get('api/statistics/faculty')
                .then(res => {
                    const { present, miss, unsatisfactory, satisfactory, good, excellent} = res.data
                    this.setState({
                        statisticsData: {
                            present,
                            miss,
                            unsatisfactory,
                            satisfactory,
                            good,
                            excellent
                        }
                    })
                })
                .catch(err => console.log(err.message))
            Axios.get('api/users/random-users')
                .then(res => {
                    this.setState({
                        randomUsers: res.data
                    })
                })
                .catch(err => console.log(err.message))
        } else {
            dispatch(getUserScheduleData(this.props.user.userId))
        }
    }

    //get groups by department
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.journalData.department !== this.state.journalData.department) {
            this.props.dispatch(getGroupsDataByDepartment(this.state.journalData.department.id))
        }
    }

    changeHandler (e) {
        if (e.target.value !== '') {
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
        const isAdmin = user.role === 'admin'
        const journalParameters = {
            group_id: journalData.group.id,
            subject_id: journalData.subject.id,
            type_id: journalData.subjectType.id,
            user_id: user.userId,
            isAdmin
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
                journalUser={this.props.journalUser}
                errors={this.props.errors}
                isLoading={this.props.isLoading}
            />
        )
    }

    renderHomeFooter() {
        const { present, miss, unsatisfactory, satisfactory, good, excellent } = this.state.statisticsData
        return (
            <div className='Home__home-footer home-footer'>
                <div className="home-footer__users-wrap">
                    <h3 className="home-footer__users-title">Пользователи</h3>
                    <div className="home-footer__users">
                        {this.state.randomUsers.map((el, index) => {
                            return (
                                <div className="home-footer__user footer-user" key={index}>
                                    <div className="footer-user__circle"/>
                                    <div className="footer-user__body">
                                        <span className="footer-user__name">{`${el.surname} ${el.name}`}</span>
                                        <span className="footer-user__position">{el.position}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="home-footer__statistics-wrap">
                    <div className="home-footer__diagram-wrap">
                        <div className="home-footer__attendance-statistics">
                            <AttendanceDoughnut
                                present={present}
                                miss={miss}
                                height={200}
                                width={300}
                            />
                        </div>
                        <p className='home-footer__statistics-title'>Успеваемость факультета за неделю</p>
                    </div>
                    <div className="home-footer__diagram-wrap">
                        <div className="home-footer__score-statistics">
                            <ScoreDoughnut
                                marksAmount={[unsatisfactory, satisfactory, good, excellent]}
                                legend={{ display: false }}
                                height={200}
                            />
                        </div>
                        <p className='home-footer__statistics-title'>Посещаемость факультета за неделю</p>
                    </div>
                </div>
            </div>
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
        const {entities, user, scheduleLoading} = this.props
        const {journalData} = this.state
        if (!entities.subjectTypes || !entities.groups || !entities.subjects || !entities.departments
            || (user.role === 'admin' && (isEmpty(this.state.statisticsData || this.state.randomUsers.length === 0)))
            || scheduleLoading ) {
            return (<Loader/>)
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
                            defaultValue={this.props.groupsLoading ? 'Загрузка...' : 'Группа'}
                            disabled={entities.groups.length === 0 || this.props.groupsLoading}
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
                    { this.props.user.role === 'admin' ? this.renderHomeFooter() : <UserSchedule schedule={this.props.schedule}/> }
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
        journalUser: state.journal.journalUser,
        user: state.auth.user,
        errors: state.errors,
        isLoading: state.journal.isLoading,
        groupsLoading: state.entities.groupsLoading,
        schedule: state.schedule,
        scheduleLoading: state.schedule.scheduleLoading
    }
}

export default connect(mapStateToProps)(Home)