import React, { Component } from "react";
import { connect } from 'react-redux'
import Axios from "axios";
import UserSchedule from "../../components/UserSchedule/UserSchedule";
import {getDepartmentsData, getPositionsData, getUserScheduleData} from "../../actions";
import userLogo from '../../assets/user-page.png'
import InputMask from "react-input-mask";
import Loader from "../../components/UI/Loader/Loader";
import MainButton from "../../components/UI/MainButton/MainButton";
import {store} from "react-notifications-component";
import groupStatisticsLogo from '../../assets/admin/group-statistics.png'
import userStatisticsLogo from '../../assets/admin/user-statistics.png'
import departmentStatisticsLogo from '../../assets/admin/department-statistics.png'
import facultyStatisticsLogo from '../../assets/admin/faculty-statistics.png'
import './PersonalPage.scss'


class PersonalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editData: false,
            userData: {
                email: '',
                phone_number: '',
                position: {},
                department: {},
                role: {},
                name: '',
                surname: '',
                patronymic: ''
            },
            dataLoading: false,
            dataUpdating: false
        }
    }

    componentDidMount() {
        const { dispatch, user } = this.props
        dispatch(getDepartmentsData())
        dispatch(getPositionsData())
        if (user.role === 'teacher') {
            dispatch(getUserScheduleData(user.userId))
        }
        this.setState({
            dataLoading: true
        })
        this.getUserData()
    }


    handleEditClick() {
        this.setState({
            editData: !this.state.editData
        })
    }

    inputChangeHandler(e) {
        const { userData } = this.state
        this.setState({
            userData: {
                ...userData,
                [e.target.name]: e.target.value
            }
        })
    }

    selectChangeHandler (e) {
        const { userData } = this.state
        this.setState({
            userData: {...userData, [e.target.name]: JSON.parse(e.target.value)}
        })
    }

    updateUserHandler (e) {
        e.preventDefault()
        const { department, position, email, phone_number, role, name, surname, patronymic } = this.state.userData
        const userData = {
            user_id: this.props.user.userId,
            department_id: department.id,
            position_id: position.id,
            email,
            phone_number,
            role_id: role.id,
            name,
            surname,
            patronymic
        }
        this.setState({
            dataUpdating: true
        })
        Axios.patch('api/users/', userData)
            .then(() => {
                this.getUserData()
                this.setState({
                    dataUpdating: false,
                    editData: false
                })
            })
            .catch(err => {
                this.setState({
                    dataUpdating: false
                })
                store.addNotification({
                    title: 'Ошибка',
                    message: err.response.data.email,
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

    getUserData () {
        Axios.get(`api/users/${this.props.user.userId}`)
            .then(res => {
                const { userData } = this.state
                this.setState({
                    userData: {
                        ...userData,
                        name: res.data.name,
                        surname: res.data.surname,
                        patronymic: res.data.patronymic,
                        email: res.data.email,
                        phone_number: res.data.phone_number,
                        role: res.data.roles[0],
                        position: res.data.positions[0],
                        department: res.data.departments[0],
                    },
                    dataLoading: false,
                    dataUpdating: false
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    renderPersonalDataForm() {
        const { editData, userData, dataUpdating } = this.state
        const { positions, departments } = this.props
        return (
            <div className="PersonalPage__personal-data personal-data">
                <div style={{ height: '100%' ,display: 'flex', flexFlow: 'column', justifyContent: 'center'}}>
                    <div
                        className="personal-data__btn-wrap"
                    >
                        <span className='personal-data__btn' onClick={ () => this.handleEditClick()}>{ editData ? 'Назад' : 'Редактировать' }</span>
                    </div>
                    <form className="personal-data__content-wrap" onSubmit={ e => this.updateUserHandler(e) }>
                        <div className="personal-data__name-wrap">
                            <div className="personal-data__user-logo"><img src={userLogo} alt="User logo"/></div>
                            {editData ?
                                <div className='personal-data__edit-fio edit-input'>
                                    <div className="edit-input__name edit-input__input">Имя:
                                        <input type="text" name='name' value={userData.name} onChange={ e => this.inputChangeHandler(e) }/>
                                    </div>
                                    <div className="edit-input__surname edit-input__input">Фамилия:
                                        <input type="text" name='surname' value={userData.surname} onChange={ e => this.inputChangeHandler(e) }/>
                                    </div>
                                    <div className="edit-input__patronymic edit-input__input">Отчество:
                                        <input type="text" name='patronymic' value={userData.patronymic} onChange={ e => this.inputChangeHandler(e) }/>
                                    </div>
                                </div>
                                : <div className="personal-data__fio">{`${userData.surname} ${userData.name} ${userData.patronymic}`}</div>}
                        </div>
                        <div className="personal-data__university-data-wrap">
                            <div className="personal-data__edit-university-data edit-input">
                                <div className="edit-input__department edit-input__select">Кафедра:
                                    <select
                                        name='department'
                                        onChange={ e => this.selectChangeHandler(e) }
                                        defaultValue={ JSON.stringify(userData.department) }
                                        disabled={!editData}
                                        required
                                    >
                                        { departments.map((el) => {
                                            return (
                                                <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="edit-input__position edit-input__select">Должность:
                                    <select
                                        name="position"
                                        onChange={ e => this.selectChangeHandler(e) }
                                        defaultValue={ JSON.stringify(userData.position) }
                                        required
                                        disabled={!editData}
                                    >
                                        { positions.map((el) => {
                                            return (
                                                <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="personal-data__contacts-wrap">
                            <div className='personal-data__edit-contacts edit-input'>
                                <div className="edit-input__phone-number edit-input__input">Номер телефона:
                                    <InputMask
                                        type="tel"
                                        name="phone_number"
                                        value={userData.phone_number}
                                        onChange={ e => this.inputChangeHandler(e) }
                                        mask='+3\8 (999) 99 99 999'
                                        disabled={!editData}
                                    />
                                </div>
                                <div className="edit-input__mail edit-input__input">E-mail:
                                    <input
                                        type="text"
                                        name='email'
                                        value={userData.email}
                                        onChange={ e => this.inputChangeHandler(e) }
                                        disabled={!editData}
                                    />
                                </div>
                            </div>
                        </div>
                        { editData && (dataUpdating ? <Loader/> :
                                <div className="personal-data__submit-btn-wrap">
                                    <MainButton
                                        className='personal-data__submit-btn'
                                        type='submit'
                                    >
                                        Сохранить
                                    </MainButton>
                                </div>
                        )
                        }
                    </form>
                </div>
            </div>
        )
    }

    renderAdminStatistics() {
        return (
            <div className='PersonalPage__admin-statistics admin-statistics'>
                <div className="admin-statistics__link-wrap">
                    <img src={groupStatisticsLogo} alt="Группы"/>
                    <span className='admin-statistics__link'>Перейти к просмотру статистики по группам</span>
                </div>
                <div className="admin-statistics__link-wrap">
                    <img src={userStatisticsLogo} alt="Группы"/>
                    <span className='admin-statistics__link'>Перейти к просмотру статистики по препадователям</span>
                </div>
                <div className="admin-statistics__link-wrap">
                    <img src={departmentStatisticsLogo} alt="Группы"/>
                    <span className='admin-statistics__link'>Перейти к просмотру статистики по кафедре</span>
                </div>
                <div className="admin-statistics__link-wrap">
                    <img src={facultyStatisticsLogo} alt="Группы"/>
                    <span className='admin-statistics__link'>Перейти к просмотру статистики по факультету</span>
                </div>
            </div>
        )
    }

    render() {
        const { dataLoading } = this.state
        const { positionsLoading, departmentsLoading, scheduleLoading, user } = this.props
        if (positionsLoading || departmentsLoading || dataLoading || scheduleLoading) {
            return (<Loader/>)
        }
        return (
            <div className='PersonalPage'>
                <div className="container">
                    <div className="PersonalPage__content-wrap">
                        { this.renderPersonalDataForm() }
                        { user.role === 'admin' ? this.renderAdminStatistics() : <UserSchedule todayOnly schedule={this.props.schedule}/>}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        schedule: state.schedule,
        scheduleLoading: state.schedule.scheduleLoading,
        user: state.auth.user,
        departments: state.entities.departments,
        positions: state.entities.positions,
        departmentsLoading: state.entities.departmentsLoading,
        positionsLoading: state.entities.positionsLoading
    }
}

export default connect(mapStateToProps)(PersonalPage)