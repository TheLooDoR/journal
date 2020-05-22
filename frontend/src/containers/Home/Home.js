import React, { Component } from 'react';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {
    getDepartmentsData,
    getGroupsDataByDepartment,
    getSubjectsData,
    getSubjectTypesData, setJournalData,
    setJournalParameters,
    getUserScheduleData, GET_GROUPS, setLatestJournal, getStatisticDataByFaculty, getRandomUsers, GET_STATISTIC_DATA
} from "../../actions";
import MainButton from '../../components/UI/MainButton/MainButton'
import Journal from "../../components/Journal/Journal";
import CustomSelect from "../../components/UI/Select/CustomSelect";
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
            showModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDepartmentsData())
        dispatch(getSubjectTypesData())
        dispatch(getSubjectsData())
        if (this.props.user.role === 'admin') {
            dispatch(setLatestJournal())
            dispatch(getStatisticDataByFaculty())
            dispatch(getRandomUsers())
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

    componentWillUnmount() {
        this.props.dispatch({
            type: GET_GROUPS,
            payload: []
        })
        if (this.props.user.role === 'admin') {
            this.props.dispatch({
                type: GET_STATISTIC_DATA,
                payload: {}
            })
        }
    }

    departmentChangeHandler(value) {
        const { journalData } = this.state
        this.setState({
            journalData: {
                ...journalData,
                department: value
            }
        })
    }

    groupChangeHandler(value) {
        const { journalData } = this.state
        this.setState({
            journalData: {
                ...journalData,
                group: value
            }
        })
    }

    subjectChangeHandler(value) {
        const { journalData } = this.state
        this.setState({
            journalData: {
                ...journalData,
                subject: value
            }
        })
    }

    subjectTypeChangeHandler(value) {
        const { journalData } = this.state
        this.setState({
            journalData: {
                ...journalData,
                subjectType: value
            }
        })
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

    latestJournalClickHandler(params) {
        const { dispatch } = this.props
        const { user } = this.props
        dispatch(setJournalParameters({
            group: {
                name: params.group
            },
            department: {
                name: params.department
            },
            subject: {
                name: params.subject
            },
            subjectType: {
                name: params.subject_type
            }
        }))
        const isAdmin = user.role === 'admin'
        const journalParameters = {
            group_id: params.group_id,
            subject_id: params.subject_id,
            type_id: params.type_id,
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

    renderLatestJournals() {
        const { latestJournals } = this.props
        if ( latestJournals.length !== 0) {
            return (
                <div className='Home__latest-journals-table admin-table__wrap'>
                    <div className="admin-table">
                        <div className="admin-table__head">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                    <th className='admin-table__department-cell'>Кафедра</th>
                                    <th>Группа</th>
                                    <th>Дисциплина</th>
                                    <th>Преподаватель</th>
                                    <th width={100}>Вид занятия</th>
                                    <th className='admin-table__open-btn'/>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="admin-table__body" ref={this.tableRef} onScroll={this.scrollHandler}>
                            <table>
                                <tbody>
                                { latestJournals.map((el, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='admin-table__number'>{ index + 1 }</td>
                                            <td>{ el.department }</td>
                                            <td>{ el.group }</td>
                                            <td>{ el.subject }</td>
                                            <td>{ el.user }</td>
                                            <td width={100}>{ el.subject_type.substr(0, 1) }.</td>
                                            <td className='admin-table__open-btn'>
                                                <MainButton
                                                    onClick={ () => this.latestJournalClickHandler(el) }
                                                >
                                                    Открыть
                                                </MainButton>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="admin-table__footer">
                            <table>
                                <tbody>
                                <tr>
                                    <td className='admin-table__number'/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td width={100}/>
                                    <td className='admin-table__open-btn'/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderHomeFooter() {
        const { present, miss, unsatisfactory, satisfactory, good, excellent } = this.props.statisticData
        return (
            <div className='Home__home-footer home-footer'>
                <div className="home-footer__users-wrap">
                    <h3 className="home-footer__users-title">Пользователи</h3>
                    <div className="home-footer__users">
                        {this.props.users.users.map((el, index) => {
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
                        <p className='home-footer__statistics-title'>Посещаемость факультета за неделю</p>
                    </div>
                    <div className="home-footer__diagram-wrap">
                        <div className="home-footer__score-statistics">
                            <ScoreDoughnut
                                marksAmount={[unsatisfactory, satisfactory, good, excellent]}
                                legend={{ display: false }}
                                height={200}
                            />
                        </div>
                        <p className='home-footer__statistics-title'>Успеваемость факультета за неделю</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {entities, user, scheduleLoading, journalLoading, statisticLoading} = this.props
        const {journalData} = this.state
        if ((!entities.subjectTypes || !entities.groups || !entities.subjects || !entities.departments) || scheduleLoading || journalLoading ) {
            return (<Loader/>)
        }
        if (user.role === 'admin' && ( statisticLoading || this.props.users.isLoading )) {
            return (<Loader/>)
        }
        return (
            <div className='Home'>
                <div className="container">
                    <div className="Home__categories">
                        <CustomSelect
                            className='Home__departments Home__select'
                            label={el => `${el.name}`}
                            value={el => el}
                            options={entities.departments}
                            isSearchable
                            changeHandler={(value) => this.departmentChangeHandler(value)}
                            placeholder='Кафедра'
                        />
                        <CustomSelect
                            className='Home__groups Home__select'
                            label={el => `${el.name}`}
                            value={el => el}
                            options={entities.groups}
                            isSearchable
                            changeHandler={(value) => this.groupChangeHandler(value)}
                            isLoading={this.props.groupsLoading}
                            disabled={this.props.groupsLoading}
                            placeholder='Группа'
                        />
                        <CustomSelect
                            className='Home__subjects Home__select'
                            label={el => `${el.full_name}`}
                            value={el => el}
                            options={entities.subjects}
                            isSearchable
                            changeHandler={(value) => this.subjectChangeHandler(value)}
                            placeholder='Дисциплина'
                        />
                        <CustomSelect
                            className='Home__subject-types Home__select'
                            label={el => `${el.name}`}
                            value={el => el}
                            options={entities.subjectTypes}
                            isSearchable
                            changeHandler={(value) => this.subjectTypeChangeHandler(value)}
                            placeholder='Тип занятия'
                        />
                        <MainButton
                            className='Home__btn'
                            onClick={this.clickHandler}
                            disabled={isEmpty(journalData.group) || isEmpty(journalData.subjectType) || isEmpty(journalData.subject)}
                        >
                            Найти
                        </MainButton>
                    </div>
                    { this.props.user.role === 'admin' && this.renderLatestJournals() }
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
        journalLoading: state.journal.journalLoading,
        user: state.auth.user,
        errors: state.errors,
        isLoading: state.journal.isLoading,
        groupsLoading: state.entities.groupsLoading,
        schedule: state.schedule,
        scheduleLoading: state.schedule.scheduleLoading,
        latestJournals: state.journal.latestJournals,
        statisticData: state.statistic.statisticData,
        statisticLoading: state.statistic.statisticLoading,
        users: state.users
    }
}

export default connect(mapStateToProps)(Home)