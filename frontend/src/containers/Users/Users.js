import React, { Component } from 'react'
import Axios from "axios";
import editLogo from '../../assets/admin/edit.png'
import deleteLogo from '../../assets/admin/delete.png'
import MainButton from "../../components/UI/MainButton/MainButton";
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";
import Modal from 'react-responsive-modal';
import Select from "../../components/UI/Select/Select";
import { connect } from 'react-redux'
import { getDepartmentsData, getPositionsData, getRolesData, getUsersData, setError} from "../../actions";
import capitalize from "../../common-js/capitalize";
import Loader from "../../components/UI/Loader/Loader";
import isEmpty from "../../common-js/isEmpty";
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
            }
        }
    }

    componentDidMount() {
        const { dispatch, currentUser } = this.props
        const { filterValue, filterType } = this.state.filterParams
        dispatch(getUsersData(filterType, filterValue, currentUser.userId))
        dispatch(getDepartmentsData())
        dispatch(getRolesData())
        dispatch(getPositionsData())
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

    selectChangeHandler (e) {
        let userData = this.state.userData
        this.setState({
            userData: {...userData, [e.target.name]: JSON.parse(e.target.value)}
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
            Axios.get(`api/users/${id}`)
                .then(res => {
                    let userData = this.state.userData
                    //set selected user data
                    this.setState({
                        userData: {
                            ...userData,
                            user_id: res.data.id,
                            email: res.data.email,
                            phone_number: res.data.phone_number,
                            role: res.data.roles[0],
                            position: res.data.positions[0],
                            department: res.data.departments[0],
                        },
                        showUpdateModal: !this.state.showUpdateModal
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else {
            this.props.dispatch(setError({}))
            this.setState({
                showUpdateModal: !this.state.showUpdateModal
            })
        }
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
        const { user_id, department, position, email, phone_number, role } = this.state.userData
        const userData = {
            user_id,
            department_id: department.id,
            position_id: position.id,
            email,
            phone_number,
            role_id: role.id
        }
        Axios.patch('api/users/', userData)
            .then(() => {
                this.hideUpdateModal()
                dispatch(setError({}))
                dispatch(getUsersData(this.state.filterParams.filterType, this.state.filterParams.filterValue, currentUser.userId))
            })
            .catch(err => {
                dispatch(setError(err.response.data))
            })
    }

    deleteUserHandler = (e) => {
        e.preventDefault()
        const { user_id } = this.state.userData
        Axios.delete(`api/users/${user_id}`)
            .then(() => {
                this.hideDeleteModal()
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
                       { isLoading ? <Loader/> :
                           <div className="admin-table__body Users__users-table">
                               <table>
                                   <tbody>
                                   {users.map((el, index) => {
                                       return (
                                           <tr key={el.id} id={`user-${el.id}`}>
                                               <td className='admin-table__number'>{ index + 1 }.</td>
                                               <td style={{ textAlign: 'left', paddingLeft: 20, paddingRight: 20 }}>{`${el.surname} ${el.name} ${el.patronymic}`}</td>
                                               <td style={{ width: 100 }}>{el.department.toUpperCase()}</td>
                                               <td style={{ width: 200 }}>{capitalize(el.position)}</td>
                                               <td>{el.email}</td>
                                               <td>{el.phone_number}</td>
                                               <td style={{ width: 100 }}>{capitalize(el.role)}</td>
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
                   </div>
               </div>
                <Modal
                    open={this.state.showUpdateModal}
                    onClose={() => this.hideUpdateModal()}
                    center
                    animationDuration={250}
                    modalId='users-update-modal'
                >
                    {isEmpty(role) || isEmpty(position) || isEmpty(department) ? <Loader/> :
                        <form onSubmit={ (e) => this.updateUserHandler(e) } className="admin-update">
                            <h3 className="admin-update__title">Редактирование</h3>
                            <div className="admin-update__inputs">
                                <div className="admin-update__input">
                                    <p className="admin-update__label">
                                        Кафедра
                                    </p>
                                    <Select
                                        name='department'
                                        changeHandler={ (e) => this.selectChangeHandler(e) }
                                        defaultValue={ JSON.stringify(this.state.userData.department) }
                                        placeholder
                                        options={
                                            departments.map( el => {
                                                return (
                                                    <option key={el.id} value={JSON.stringify(el)}>{ capitalize(el.full_name) }</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                                <div className="admin-update__input">
                                    <p className="admin-update__label">
                                        Должность
                                    </p>
                                    <Select
                                        name='position'
                                        changeHandler={ (e) => this.selectChangeHandler(e) }
                                        defaultValue={ JSON.stringify(this.state.userData.position) }
                                        placeholder
                                        options={
                                            positions.map( el => {
                                                return (
                                                    <option key={el.id} value={JSON.stringify(el)}>{ capitalize(el.name) }</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                                <div className="admin-update__input">
                                    <p className="admin-update__label">E-mail</p>
                                    <input
                                        className={`update-input-text ${this.props.errors.email ? 'invalid' : null}`}
                                        type="email"
                                        name='email'
                                        value={this.state.userData.email}
                                        onChange={ (e) => this.inputChangeHandler(e) }/>
                                    {this.props.errors.email && (<div className="feedback">{this.props.errors.email}</div>)}
                                </div>
                                <div className="admin-update__input">
                                    <p className="admin-update__label">Номер телефона</p>
                                    <InputMask
                                        type="tel"
                                        // className={`form-input ${errors.phone_number ? 'invalid' : null}`}
                                        className='update-input-text'
                                        name="phone_number"
                                        onChange={ (e) => this.inputChangeHandler(e) }
                                        value={ this.state.userData.phone_number }
                                        mask='+3\8 (999) 99 99 999'
                                    />
                                </div>
                                <div className="admin-update__input">
                                    <p className="admin-update__label">
                                        Роль
                                    </p>
                                    <Select
                                        name='role'
                                        changeHandler={ (e) => this.selectChangeHandler(e) }
                                        defaultValue={ JSON.stringify(this.state.userData.role) }
                                        placeholder
                                        options={
                                            roles.map( el => {
                                                return (
                                                    <option key={el.id} value={JSON.stringify(el)}>{ capitalize(el.full_name) }</option>
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <MainButton
                                type='submit'
                                className='admin-update__submit'
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
                            Вы уверенны что хотите удалить пользователя
                            <span>{`${this.state.userData.surname} ${this.state.userData.name} ${this.state.userData.patronymic}?`}</span>
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