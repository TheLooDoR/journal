import React, { Component } from "react";
import { connect } from 'react-redux'
import FilterSearch from "../../../components/UI/FilterSearch/FilterSearch";
import MainButton from "../../../components/UI/MainButton/MainButton";
import CustomSelect from "../../../components/UI/Select/CustomSelect";
import Modal from 'react-responsive-modal';
import {
    GET_GROUPS,
    getCorpsData,
    getDepartmentsData,
    getGroupsDataByDepartment,
    getScheduleData,
    getSelectUsersData,
    getSubjectsData, getSubjectTypesData, getTimeData, getWeekDaysData, requestScheduleData, requestScheduleDataFinished
} from "../../../actions";
import Axios from "axios";
import { store} from 'react-notifications-component'
import editLogo from "../../../assets/admin/edit.png";
import deleteLogo from "../../../assets/admin/delete.png";
import isEmpty from "../../../common-js/isEmpty";
import Checkbox from "../../../components/UI/CheckBox/CheckBox";
import Loader from "../../../components/UI/Loader/Loader";
import './AdminSchedule.scss'

class AdminSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterParams: {
                filterValue: '',
                filterType: 'by-group'
            },
            scheduleData: {
                id: {
                    group_id: null,
                    week_day_id: null,
                    time_id: null
                },
                user: {},
                subject: {},
                group: {},
                subjectType: {},
                weekDay: {},
                time: {},
                corp: {},
                hall: '',
                first_week: false,
                second_week: false
            },
            scheduleParams: {
                department: {},
                group: {},
            },
            scheduleDataLoading: false,
            showCreateScheduleModal: false,
            showUpdateScheduleModal: false,
            showDeleteScheduleModal: false,
            scrollValue: 0
        }
    }

    tableRef = React.createRef()

    componentDidMount() {
        const { dispatch } = this.props
        const { filterParams } = this.state
        dispatch(getDepartmentsData())
        dispatch(getScheduleData(filterParams.filterType, filterParams.filterValue))
        dispatch(getSelectUsersData())
        dispatch(getSubjectsData())
        dispatch(getSubjectTypesData())
        dispatch(getCorpsData())
        dispatch(getTimeData())
        dispatch(getWeekDaysData())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.scheduleParams.department !== this.state.scheduleParams.department) {
            this.props.dispatch(getGroupsDataByDepartment(this.state.scheduleParams.department.id))
        }
        const table = this.tableRef.current
        if(table) {
            table.scrollTop = this.state.scrollValue
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: GET_GROUPS,
            payload: []
        })
    }

    scrollHandler = () => {
        const table = this.tableRef.current
        if(table) {
            this.setState({
                scrollValue: table.scrollTop
            })
        }
    }

    paramsDepartmentChangeHandler(value) {
        const { scheduleParams } = this.state
        this.setState({
            scheduleParams: {
                ...scheduleParams,
                department: value
            }
        })
    }

    paramsGroupChangeHandler(value) {
        const { scheduleParams } = this.state
        this.setState({
            scheduleParams: {
                ...scheduleParams,
                group: value
            }
        })
    }

    filterChangeHandler = e => {
        const { filterParams } = this.state
        this.setState({
            filterParams: { ...filterParams, [e.target.name]: e.target.value }
        })
    }

    filterSubmit = () => {
        const { dispatch } = this.props
        const { filterType, filterValue } = this.state.filterParams
        dispatch(getScheduleData(filterType, filterValue))
    }

    selectChangeHandler(e) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                [e.target.name]: JSON.parse(e.target.value)
            }
        })
    }

    scheduleUserChangeHandler(value) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                user: value
            }
        })
    }

    scheduleSubjectChangeHandler(value) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                subject: value
            }
        })
    }

    scheduleSubjectTypeChangeHandler(value) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                subjectType: value
            }
        })
    }

    scheduleWeekDayChangeHandler(value) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                weekDay: value
            }
        })
    }

    scheduleTimeChangeHandler(value) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                time: value
            }
        })
    }

    scheduleCorpChangeHandler(value) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                corp: value
            }
        })
    }

    inputChangeHandler(e) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                [e.target.name]: e.target.value
            }
        })
    }

    checkboxChangeHandler(e) {
        const { scheduleData } = this.state
        this.setState({
            scheduleData: {
                ...scheduleData,
                [e.target.name]: e.target.checked
            }
        })
    }

    createScheduleHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { user, subject, subjectType, weekDay, time, corp, hall, first_week, second_week } = this.state.scheduleData
        const { filterType, filterValue} = this.state.filterParams
        const params = {
            user_id: user.id,
            subject_id: subject.id,
            group_id: this.state.scheduleParams.group.id,
            type_id: subjectType.id,
            week_day_id: weekDay.id,
            time_id: time.id,
            corps_id: corp.id,
            hall,
            first_week,
            second_week
        }
        this.hideCreateScheduleModal()
        dispatch(requestScheduleData())
        Axios.post('api/schedule', params)
            .then(() => {
                dispatch(getScheduleData(filterType, filterValue))
            })
            .catch(err => {
                dispatch(requestScheduleDataFinished())
                store.addNotification({
                    title: 'Ошибка',
                    message: err.response.data.msg,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 10000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true
                    }
                });
            })
    }

    updateScheduleHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { user, subject, group, subjectType, weekDay, time, corp, hall, id, first_week, second_week } = this.state.scheduleData
        const { filterType, filterValue} = this.state.filterParams
        const scheduleData = {
            user_id: user.id,
            subject_id: subject.id,
            group_id: group.id,
            type_id: subjectType.id,
            week_day_id: weekDay.id,
            time_id: time.id,
            corps_id: corp.id,
            hall,
            id,
            first_week,
            second_week
        }
        this.hideUpdateScheduleModal()
        dispatch(requestScheduleData())
        Axios.patch('api/schedule', scheduleData)
            .then(() => {
                dispatch(getScheduleData(filterType, filterValue))
            })
            .catch(err => {
                dispatch(requestScheduleDataFinished())
                store.addNotification({
                    title: 'Ошибка',
                    message: err.response.data.msg,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 10000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true
                    }
                });
            })
    }

    deleteScheduleHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { group_id, week_day_id, time_id, first_week, second_week } = this.state.scheduleData.id
        const params = {
            group_id,
            week_day_id,
            time_id,
            first_week,
            second_week
        }
        const { filterType, filterValue} = this.state.filterParams
        this.hideDeleteScheduleModal()
        dispatch(requestScheduleData())
        Axios.delete('api/schedule', { params: params})
            .then(() => {
                dispatch(getScheduleData(filterType, filterValue))
            })
            .catch(err => {
                dispatch(requestScheduleDataFinished())
                store.addNotification({
                    title: 'Ошибка',
                    message: err.response.data.msg,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 10000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true
                    }
                });
            })
    }

    hideCreateScheduleModal() {
        const { scheduleData } = this.state
        this.setState({
            showCreateScheduleModal: !this.state.showCreateScheduleModal,
            scheduleData: {
                ...scheduleData,
                id: {},
                user: {},
                subject: {},
                group: {},
                subjectType: {},
                weekDay: {},
                time: {},
                corp: {},
                hall: '',
                first_week: false,
                second_week: false
            }
        })
    }

    hideUpdateScheduleModal(params) {
        if (!this.state.showUpdateScheduleModal) {
            const data = {
                group_id: params.group_id,
                week_day_id: params.week_day_id,
                time_id: params.time_id,
                first_week: params.first_week,
                second_week: params.second_week
            }
            this.setState({
                scheduleDataLoading: true
            })
            Axios.get('api/schedule/byId', { params: data})
                .then(res => {
                    const { scheduleData } = this.state
                    this.setState({
                        scheduleData: {
                            ...scheduleData,
                            id: {
                                ...data
                            },
                            user: res.data.users[0],
                            subject: res.data.subjects[0],
                            group: res.data.groups[0],
                            subjectType: res.data.subject_types[0],
                            weekDay: res.data.week_days[0],
                            time: res.data.times[0],
                            corp: res.data.corps[0],
                            hall: res.data.hall,
                            first_week: res.data.first_week,
                            second_week: res.data.second_week
                        },
                        scheduleDataLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }
        this.setState({
            showUpdateScheduleModal: !this.state.showUpdateScheduleModal
        })
    }

    hideDeleteScheduleModal(schedule) {
        if (!this.state.showDeleteScheduleModal) {
            const { scheduleData } = this.state
            this.setState({
                scheduleData: {
                    ...scheduleData,
                    id: {
                        group_id: schedule.group_id,
                        week_day_id: schedule.week_day_id,
                        time_id: schedule.time_id,
                        first_week: schedule.first_week,
                        second_week: schedule.second_week
                    },
                    group: schedule.group,
                    time: schedule.time,
                    subject: schedule.subject,
                    subjectType: schedule.subject_type
                }
            })
        }
        this.setState({
            showDeleteScheduleModal: !this.state.showDeleteScheduleModal
        })
    }

    renderScheduleTable() {
        const { departments, groups, groupsLoading, schedule, scheduleLoading } = this.props
        const { scheduleParams } = this.state
        return (
            <div className='admin-table__wrap AdminSchedule__table'>
                <div className="admin-table">
                    <div className="admin-table__filter-table">
                        <table>
                            <thead>
                                <tr>
                                    <th  className='admin-table__title'>Расписание</th>
                                </tr>
                                <tr>
                                    <th  className='admin-table__filter-col'>
                                        <div className="AdminSchedule__filter-wrap">
                                            <div className='admin-table__filter-wrap'>
                                                <div className="AdminSchedule__search">
                                                    <FilterSearch
                                                        options={[
                                                            {name: 'По группе', value: 'by-group'},
                                                            {name: 'По дисциплине', value: 'by-subject'},
                                                            {name: 'По преподавателю', value: 'by-user'}
                                                        ]}
                                                        height={45}
                                                        inputName='filterValue'
                                                        selectName='filterType'
                                                        changeHandler={ this.filterChangeHandler }
                                                        selectValue={this.state.filterParams.filterType}
                                                        inputValue={this.state.filterParams.filterValue}
                                                    />
                                                </div>
                                                <MainButton className='admin-table__filter-btn' onClick={() => this.filterSubmit() }>Найти</MainButton>
                                            </div>
                                            <div className="AdminSchedule__group-selects">
                                                <CustomSelect
                                                    className='AdminSchedule__select AdminSchedule__department-select'
                                                    label={el => `${el.name}`}
                                                    value={el => el}
                                                    options={departments}
                                                    isSearchable
                                                    changeHandler={(value) => this.paramsDepartmentChangeHandler(value)}
                                                    placeholder='Кафедра'
                                                />
                                                <CustomSelect
                                                    className='AdminSchedule__select AdminSchedule__group-select'
                                                    label={el => `${el.name}`}
                                                    value={el => el}
                                                    options={groups}
                                                    isSearchable
                                                    changeHandler={(value) => this.paramsGroupChangeHandler(value)}
                                                    placeholder='Группа'
                                                    isLoading={groupsLoading}
                                                    disabled={groupsLoading }
                                                />
                                                <MainButton
                                                    className='AdminSchedule__btn'
                                                    onClick={() => this.hideCreateScheduleModal()}
                                                    disabled={isEmpty(scheduleParams.group) || isEmpty(scheduleParams.department)}
                                                >
                                                    Создать
                                                </MainButton>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="admin-table__head">
                        <table>
                            <thead>
                            <tr>
                                <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                <th>Группа</th>
                                <th>Дисциплина</th>
                                <th width={60}>Вид. зан.</th>
                                <th>Препод.</th>
                                <th>Учеб. корпус</th>
                                <th width={60}>Аудит</th>
                                <th>Нач. занятия</th>
                                <th>День недели</th>
                                <th width={100}>Неделя</th>
                                <th className='admin-table__btn-cell'/>
                                <th className='admin-table__btn-cell'/>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    { scheduleLoading ? <Loader/> : schedule.length === 0 ? <p className='AdminSchedule__not-found'>Не найдено</p> :
                        <div className="admin-table__body AdminSchedule__schedule-table" ref={this.tableRef} onScroll={this.scrollHandler}>
                            <table>
                                <tbody>
                                { schedule.map((el, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='admin-table__number'>{index + 1}</td>
                                            <td>{el.group}</td>
                                            <td>{el.subject}</td>
                                            <td width={60}>{ el.subject_type.substr(0, 1) }.</td>
                                            <td>{`${el.user_surname} ${el.user_name.substr(0, 1)}. ${el.user_patronymic.substr(0, 1)}.`}</td>
                                            <td>{ el.corp }</td>
                                            <td width={60}>{ el.hall }</td>
                                            <td> {el.time} </td>
                                            <td> {el.week_day}</td>
                                            <td width={50}><Checkbox label={1} readOnly checked={el.first_week}/></td>
                                            <td width={50}><Checkbox label={2} readOnly checked={el.second_week}/></td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__edit-btn'
                                                    onClick={() => this.hideUpdateScheduleModal(el)}
                                                >
                                                    <img src={editLogo} alt='Редактировать'/>
                                                </button>
                                            </td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__delete-btn'
                                                    onClick={() => this.hideDeleteScheduleModal(el)}
                                                >
                                                    <img src={deleteLogo} alt='Удалить'/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    }
                    { !scheduleLoading  && schedule.length !== 0 &&
                        <div className="admin-table__footer">
                            <table>
                                <tbody>
                                <tr>
                                    <td className='admin-table__number'/>
                                    <td/>
                                    <td/>
                                    <td width={60}/>
                                    <td/>
                                    <td/>
                                    <td width={60}/>
                                    <td/>
                                    <td/>
                                    <td width={50}/>
                                    <td width={50}/>
                                    <td className='admin-table__btn-cell'/>
                                    <td className='admin-table__btn-cell'/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        )
    }

    renderCreateScheduleModal() {
        const { subjects, subjectTypes, users, corps, time, weekDays } = this.props
        const { user, subject, subjectType, weekDay, corp, hall } = this.state.scheduleData
        return (
            <Modal
                onClose={ () => this.hideCreateScheduleModal() }
                open={this.state.showCreateScheduleModal}
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createScheduleHandler(e) } className='admin-post'>
                    <h3 className="admin-post__title">Создание</h3>
                    <div className="admin-post__inputs">
                        <div className="admin-post__input">
                            <p className="admin-post__label">Группа</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                value={this.state.scheduleParams.group.name}
                                readOnly
                                disabled
                                style={{
                                    background: 'transparent',
                                    color: 'black'
                                }}
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Дисциплина</p>
                            <CustomSelect
                                className='admin-post__select'
                                label={el => `${el.full_name}`}
                                value={el => el}
                                options={subjects}
                                isSearchable
                                changeHandler={(value) => this.scheduleSubjectChangeHandler(value)}
                                placeholder=''
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Вид занятия</p>
                            <CustomSelect
                                className='admin-post__select'
                                label={el => `${el.name}`}
                                value={el => el}
                                options={subjectTypes}
                                isSearchable
                                changeHandler={(value) => this.scheduleSubjectTypeChangeHandler(value)}
                                placeholder=''
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Преподаватель</p>
                            <CustomSelect
                                className='admin-post__select'
                                label={el => `${el.surname} ${el.name} ${el.patronymic}`}
                                value={el => el}
                                options={users}
                                isSearchable
                                changeHandler={(value) => this.scheduleUserChangeHandler(value)}
                                placeholder=''
                            />
                        </div>
                        <div className="admin-post__combined-input">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Учебный корпус</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.name}`}
                                    value={el => el}
                                    options={corps}
                                    isSearchable
                                    changeHandler={(value) => this.scheduleCorpChangeHandler(value)}
                                    placeholder=''
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Аудитория</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='hall'
                                    value={this.state.scheduleData.hall}
                                    onChange={ e => this.inputChangeHandler(e) }
                                    required
                                />
                            </div>
                        </div>
                        <div className="admin-post__combined-input">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Начало занятия</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.time}`}
                                    value={el => el}
                                    options={time}
                                    isSearchable
                                    changeHandler={(value) => this.scheduleTimeChangeHandler(value)}
                                    placeholder=''
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">День недели</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.name}`}
                                    value={el => el}
                                    options={weekDays}
                                    isSearchable
                                    changeHandler={(value) => this.scheduleWeekDayChangeHandler(value)}
                                    placeholder=''
                                />
                            </div>
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Неделя</p>
                            <Checkbox
                                label='1'
                                className='admin-post__checkbox'
                                style={{marginRight: 40}}
                                name='first_week'
                                checked={this.state.scheduleData.first_week}
                                changeHandler={ e => this.checkboxChangeHandler(e) }
                            />
                            <Checkbox
                                label='2'
                                className='admin-post__checkbox'
                                name='second_week'
                                checked={this.state.scheduleData.second_week}
                                changeHandler={ e => this.checkboxChangeHandler(e) }
                            />
                        </div>
                    </div>
                    <MainButton
                        type='submit'
                        className='admin-post__submit'
                        disabled={ (!this.state.scheduleData.first_week && !this.state.scheduleData.second_week) || ((isEmpty(subjectType)) || isEmpty(subject) || isEmpty(user)
                            || isEmpty(weekDay) || isEmpty(this.state.scheduleData.time) || isEmpty(corp)) || hall === ''}
                    >
                        Создать
                    </MainButton>
                </form>
            </Modal>
        )
    }

    renderUpdateScheduleModal() {
        const { subjects, subjectTypes, users, corps, time, weekDays } = this.props
        const { scheduleDataLoading } = this.state
        return (
            <Modal
                onClose={ () => this.hideUpdateScheduleModal() }
                open={this.state.showUpdateScheduleModal}
                center
                animationDuration={250}
            >
                { scheduleDataLoading || isEmpty(subjects) || isEmpty(subjectTypes) || isEmpty(users) || isEmpty(corps) || isEmpty(time) || isEmpty(weekDays)
                ? <Loader/> :
                    <form onSubmit={ e => this.updateScheduleHandler(e) } className='admin-post'>
                        <h3 className="admin-post__title">Редактирование</h3>
                        <div className="admin-post__inputs">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Группа</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    value={this.state.scheduleData.group.name}
                                    readOnly
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Дисциплина</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.full_name}`}
                                    value={el => el}
                                    options={subjects}
                                    isSearchable
                                    changeHandler={(value) => this.scheduleSubjectChangeHandler(value)}
                                    placeholder=''
                                    defaultValue={this.state.scheduleData.subject}
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Вид занятия</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.name}`}
                                    value={el => el}
                                    options={subjectTypes}
                                    isSearchable
                                    changeHandler={(value) => this.scheduleSubjectTypeChangeHandler(value)}
                                    placeholder=''
                                    defaultValue={this.state.scheduleData.subjectType}
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Преподаватель</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.surname} ${el.name} ${el.patronymic}`}
                                    value={el => el}
                                    options={users}
                                    isSearchable
                                    changeHandler={(value) => this.scheduleUserChangeHandler(value)}
                                    placeholder=''
                                    defaultValue={this.state.scheduleData.user}
                                />
                            </div>
                            <div className="admin-post__combined-input">
                                <div className="admin-post__input">
                                    <p className="admin-post__label">Учебный корпус</p>
                                    <CustomSelect
                                        className='admin-post__select'
                                        label={el => `${el.name}`}
                                        value={el => el}
                                        options={corps}
                                        isSearchable
                                        changeHandler={(value) => this.scheduleCorpChangeHandler(value)}
                                        placeholder=''
                                        defaultValue={this.state.scheduleData.corp}
                                    />
                                </div>
                                <div className="admin-post__input">
                                    <p className="admin-post__label">Аудитория</p>
                                    <input
                                        className='crud-input-text'
                                        type="text"
                                        name='hall'
                                        value={this.state.scheduleData.hall}
                                        onChange={ e => this.inputChangeHandler(e) }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="admin-post__combined-input">
                                <div className="admin-post__input">
                                    <p className="admin-post__label">Начало занятия</p>
                                    <CustomSelect
                                        className='admin-post__select'
                                        label={el => `${el.time}`}
                                        value={el => el}
                                        options={time}
                                        isSearchable
                                        changeHandler={(value) => this.scheduleTimeChangeHandler(value)}
                                        placeholder=''
                                        defaultValue={this.state.scheduleData.time}
                                    />
                                </div>
                                <div className="admin-post__input">
                                    <p className="admin-post__label">День недели</p>
                                    <CustomSelect
                                        className='admin-post__select'
                                        label={el => `${el.name}`}
                                        value={el => el}
                                        options={weekDays}
                                        isSearchable
                                        changeHandler={(value) => this.scheduleWeekDayChangeHandler(value)}
                                        placeholder=''
                                        defaultValue={this.state.scheduleData.weekDay}
                                    />
                                </div>
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Неделя</p>
                                <Checkbox
                                    label='1'
                                    className='admin-post__checkbox'
                                    style={{marginRight: 40}}
                                    checked={this.state.scheduleData.first_week}
                                    name='first_week'
                                    changeHandler={ e => this.checkboxChangeHandler(e) }
                                />
                                <Checkbox
                                    label='2'
                                    className='admin-post__checkbox'
                                    checked={this.state.scheduleData.second_week}
                                    name='second_week'
                                    changeHandler={ e => this.checkboxChangeHandler(e) }
                                />
                            </div>
                        </div>
                        <MainButton
                            type='submit'
                            className='admin-post__submit'
                            disabled={ !this.state.scheduleData.first_week && !this.state.scheduleData.second_week}
                        >
                            Сохранить
                        </MainButton>
                    </form>
                }
            </Modal>
        )
    }

    renderDeleteScheduleModal() {
        const { group, subject, subjectType, time} = this.state.scheduleData
        return (
            <Modal
                onClose={ () => this.hideDeleteScheduleModal() }
                open={ this.state.showDeleteScheduleModal }
                center
                animationDuration={250}
                modalId='delete-schedule-modal'
            >
                <form
                    onSubmit={ e => this.deleteScheduleHandler(e) }
                    className='admin-delete'
                >
                    <p className='admin-delete__text'>
                        Вы уверены что хотите удалить занятие
                        <span>{`${group}, ${subjectType}, ${subject}, ${time}`}</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteScheduleModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    render() {
        return (
            <div className='AdminSchedule'>
                {this.renderScheduleTable()}
                {this.renderCreateScheduleModal()}
                {this.renderUpdateScheduleModal()}
                {this.renderDeleteScheduleModal()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        departments: state.entities.departments,
        groups: state.entities.groups,
        groupsLoading: state.entities.groupsLoading,
        schedule: state.schedule.schedule,
        scheduleLoading: state.schedule.scheduleLoading,
        subjects: state.entities.subjects,
        subjectTypes: state.entities.subjectTypes,
        users: state.users.users,
        corps: state.entities.corps,
        time: state.entities.time,
        weekDays: state.entities.weekDays
    }
}

export default connect(mapStateToProps)(AdminSchedule)