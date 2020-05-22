import React, { Component } from 'react'
import Axios from "axios";
import editLogo from '../../../assets/admin/edit.png'
import deleteLogo from '../../../assets/admin/delete.png'
import MainButton from "../../../components/UI/MainButton/MainButton";
import FilterSearch from "../../../components/UI/FilterSearch/FilterSearch";
import Modal from 'react-responsive-modal';
import CustomSelect from "../../../components/UI/Select/CustomSelect";
import { connect } from 'react-redux'
import {
    getDepartmentsData,
    getPositionsData,
    getRolesData,
    getUsersData,
    requestUsersData,
    setError
} from "../../../actions";
import { store } from 'react-notifications-component'
import Loader from "../../../components/UI/Loader/Loader";
import isEmpty from "../../../common-js/isEmpty";
import InputMask from "react-input-mask";

import './Users.scss'

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUpdateModal: false,
            showDeleteModal: false,
            filterParams: {
                filterValue: '',
                filterType: 'by-role'
            },
            userData: {
                user_id: '',
                email: '',
                phone_number: '',
                role: {},
                position: {},
                department: {},
                name: '',
                surname: '',
                patronymic: ''
            },
            userDataLoading: false,
            scrollValue: 0
        }
    }

    tableRef = React.createRef()

    componentDidMount() {
        const { dispatch, currentUser } = this.props
        const { filterValue, filterType } = this.state.filterParams
        dispatch(getUsersData(filterType, filterValue, currentUser.userId))
        dispatch(getDepartmentsData())
        dispatch(getRolesData())
        dispatch(getPositionsData())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const table = this.tableRef.current
        if(table) {
            table.scrollTop = this.state.scrollValue
        }
    }

    scrollHandler = () => {
        const table = this.tableRef.current
        if(table) {
            this.setState({
                scrollValue: table.scrollTop
            })
        }
    }

    filterChangeHandler = (e) => {
        let filterParams = this.state.filterParams
        this.setState({
            filterParams: { ...filterParams, [e.target.name]: e.target.value }
        })
    }

    filterSubmit = () => {
        const { dispatch, currentUser } = this.props
        const { filterValue, filterType } = this.state.filterParams
        dispatch(getUsersData(filterType, filterValue, currentUser.userId))
    }

    departmentChangeHandler(value) {
        const { userData } = this.state
        this.setState({
            userData: {
                ...userData,
                department: value
            }
        })
    }

    positionChangeHandler(value) {
        const { userData } = this.state
        this.setState({
            userData: {
                ...userData,
                position: value
            }
        })
    }

    roleChangeHandler(value) {
        const { userData } = this.state
        this.setState({
            userData: {
                ...userData,
                role: value
            }
        })
    }

    inputChangeHandler (e) {
        let userData = this.state.userData
        this.setState({
            userData: {...userData, [e.target.name]: e.target.value}
        })
    }

    hideUpdateModal( id = null) {
        //if open model
        if (!this.state.showUpdateModal) {
            this.setState({
                userDataLoading: true
            })
            Axios.get(`api/users/${id}`)
                .then(res => {
                    let userData = this.state.userData
                    //set selected user data
                    this.setState({
                        userData: {
                            ...userData,
                            user_id: res.data.id,
                            name: res.data.name,
                            surname: res.data.surname,
                            patronymic: res.data.patronymic,
                            email: res.data.email,
                            phone_number: res.data.phone_number,
                            role: res.data.roles[0],
                            position: res.data.positions[0],
                            department: res.data.departments[0],
                        },
                        userDataLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateModal: !this.state.showUpdateModal
        })
    }

    hideDeleteModal(user = null) {
        let userData = this.state.userData
        if (user) {
            this.setState({
                userData: {
                    ...userData,
                    user_id: user.id,
                    name: user.name,
                    surname: user.surname,
                    patronymic: user.patronymic
                }
            })
        }
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
        })
    }

    updateUserHandler = (e) => {
        e.preventDefault()
        const { dispatch, currentUser } = this.props
        const { user_id, department, position, email, phone_number, role, name, surname, patronymic } = this.state.userData
        const userData = {
            user_id,
            department_id: department.id,
            position_id: position.id,
            email,
            phone_number,
            role_id: role.id,
            name,
            surname,
            patronymic
        }
        this.hideUpdateModal()
        dispatch(requestUsersData())
        Axios.patch('api/users/', userData)
            .then(() => {
                dispatch(setError({}))
                dispatch(getUsersData(this.state.filterParams.filterType, this.state.filterParams.filterValue, currentUser.userId))
            })
            .catch(err => {
                dispatch(getUsersData(this.state.filterParams.filterType, this.state.filterParams.filterValue, currentUser.userId))
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

    deleteUserHandler = (e) => {
        e.preventDefault()
        const { user_id } = this.state.userData
        this.hideDeleteModal()
        this.props.dispatch(requestUsersData())
        Axios.delete(`api/users/${user_id}`)
            .then(() => {
                this.props.dispatch(getUsersData(this.state.filterParams.filterType, this.state.filterParams.filterValue, this.props.currentUser.userId))
            })
            .catch(err => console.log(err.response.data))
    }

    render() {
        const { departments, positions, roles, users, isLoading } = this.props
        const { department, role, position } = this.state.userData
        return (
            <div className='Users'>
                <div className="admin-table__wrap Users__table">
                    <div className="admin-table">
                        <div className="admin-table__filter-table">
                            <table>
                                <thead>
                                <tr>
                                    <th  className='admin-table__title'>Управление пользователями</th>
                                </tr>
                                <tr>
                                    <th  className='admin-table__filter-col'>
                                        <div className='admin-table__filter-wrap'>
                                            <div className="Users__search">
                                                <FilterSearch
                                                    options={[
                                                        {name: 'По роли', value: 'by-role'},
                                                        {name: 'По должности', value: 'by-position'},
                                                        {name: 'По кафедре', value: 'by-department'}
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
                                    <th style={{ fontSize: 24 }}>ФИО</th>
                                    <th style={{ width: 100 }}>Кафедра</th>
                                    <th style={{ width: 200 }}>Должность</th>
                                    <th>E-mail</th>
                                    <th>Номер телефона</th>
                                    <th style={{ width: 100 }}>Роль</th>
                                    <th className='admin-table__btn-cell'/>
                                    <th className='admin-table__btn-cell'/>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        { isLoading ? <Loader/> : users.length === 0 ? <p className='Users__not-found'>Пользователи не найдены</p> :
                            <div className="admin-table__body Users__users-table" ref={this.tableRef} onScroll={this.scrollHandler}>
                                <table>
                                    <tbody>
                                    {users.map((el, index) => {
                                        return (
                                            <tr key={index} id={`user-${el.id}`}>
                                                <td className='admin-table__number'>{ index + 1 }.</td>
                                                <td style={{ textAlign: 'left', paddingLeft: 20, paddingRight: 20 }}>{`${el.surname} ${el.name} ${el.patronymic}`}</td>
                                                <td style={{ width: 100 }}>{el.department}</td>
                                                <td style={{ width: 200 }}>{el.position}</td>
                                                <td>{el.email}</td>
                                                <td>{el.phone_number}</td>
                                                <td style={{ width: 100 }}>{el.role}</td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__edit-btn'
                                                        onClick={() => this.hideUpdateModal(el.id)}
                                                    >
                                                        <img src={editLogo} alt='Редактировать'/>
                                                    </button>
                                                </td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__delete-btn'
                                                        onClick={() => this.hideDeleteModal({id: el.id, name: el.name, surname: el.surname, patronymic: el.patronymic})}
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
                        { !isLoading && users.length !== 0 &&
                            <div className="admin-table__footer">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className='admin-table__number'/>
                                        <td/>
                                        <td style={{ width: 100 }}/>
                                        <td style={{ width: 200 }}/>
                                        <td/>
                                        <td/>
                                        <td style={{ width: 100 }}/>
                                        <td className='admin-table__btn-cell'/>
                                        <td className='admin-table__btn-cell'/>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
                <Modal
                    open={this.state.showUpdateModal}
                    onClose={() => this.hideUpdateModal()}
                    center
                    animationDuration={250}
                    modalId='users-update-modal'
                >
                    {isEmpty(role) || isEmpty(position) || isEmpty(department) || this.state.userDataLoading ? <Loader/> :
                        <form onSubmit={ (e) => this.updateUserHandler(e) } className="admin-post">
                            <h3 className="admin-post__title">Редактирование</h3>
                            <div className="admin-post__inputs">
                                <div className="admin-post__input">
                                    <p className="admin-post__label">
                                        Кафедра
                                    </p>
                                    <CustomSelect
                                        className='admin-post__select'
                                        label={el => `${el.name}`}
                                        value={el => el}
                                        options={departments}
                                        isSearchable
                                        changeHandler={(value) => this.departmentChangeHandler(value)}
                                        placeholder='Кафедра'
                                        defaultValue={this.state.userData.department}
                                    />
                                </div>
                                <div className="admin-post__input">
                                    <p className="admin-post__label">
                                        Должность
                                    </p>
                                    <CustomSelect
                                        className='admin-post__select'
                                        label={el => `${el.name}`}
                                        value={el => el}
                                        options={positions}
                                        isSearchable
                                        changeHandler={(value) => this.positionChangeHandler(value)}
                                        placeholder='Должность'
                                        defaultValue={this.state.userData.position}
                                    />
                                </div>
                                <div className="admin-post__input">
                                    <p className="admin-post__label">E-mail</p>
                                    <input
                                        className={`crud-input-text ${this.props.errors.email ? 'invalid' : null}`}
                                        type="email"
                                        name='email'
                                        value={this.state.userData.email}
                                        onChange={ (e) => this.inputChangeHandler(e) }/>
                                    {this.props.errors.email && (<div className="feedback">{this.props.errors.email}</div>)}
                                </div>
                                <div className="admin-post__input">
                                    <p className="admin-post__label">Номер телефона</p>
                                    <InputMask
                                        type="tel"
                                        className='crud-input-text'
                                        name="phone_number"
                                        onChange={ (e) => this.inputChangeHandler(e) }
                                        value={ this.state.userData.phone_number }
                                        mask='+3\8 (999) 99 99 999'
                                    />
                                </div>
                                <div className="admin-post__input">
                                    <p className="admin-post__label">
                                        Роль
                                    </p>
                                    <CustomSelect
                                        className='admin-post__select'
                                        label={el => `${el.full_name}`}
                                        value={el => el}
                                        options={roles}
                                        isSearchable
                                        changeHandler={(value) => this.roleChangeHandler(value)}
                                        placeholder='Роль'
                                        defaultValue={this.state.userData.role}
                                    />
                                </div>
                            </div>
                            <MainButton
                                type='submit'
                                className='admin-post__submit'
                            >
                                Сохранить
                            </MainButton>
                        </form>
                    }
                </Modal>
                <Modal
                    onClose={() => this.hideDeleteModal() }
                    open={this.state.showDeleteModal}
                    center animationDuration={250}
                    modalId='users-delete-modal'
                >
                    <form onSubmit={ e => this.deleteUserHandler(e) } className="admin-delete">
                        <p className="admin-delete__text">
                            Вы уверены что хотите удалить пользователя
                            <span>{`${this.state.userData.surname} ${this.state.userData.name} ${this.state.userData.patronymic}?`}</span>
                            <span className="admin-delete__warning">Внимание! Данное действие приведёт к удалению всех связанных данных с выбранной записью.</span>
                        </p>
                        <div className="admin-delete__buttons">
                            <button className="admin-delete__btn" onClick={(e) => {
                                e.preventDefault()
                                this.hideDeleteModal()
                            }}>Нет</button>
                            <button className="admin-delete__btn" type='submit'>Да</button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.users,
        isLoading: state.users.isLoading,
        departments: state.entities.departments,
        positions: state.entities.positions,
        roles: state.entities.roles,
        errors: state.errors,
        currentUser: state.auth.user
    }
}

export default connect(mapStateToProps)(Users)