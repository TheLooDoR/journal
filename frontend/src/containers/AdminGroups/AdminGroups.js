import React, { Component } from "react";
import { connect } from 'react-redux'
import Axios from "axios";
import {
    getDepartmentsData,
    getGroupsData,
    getStudentsData,
    requestGroups,
    requestStudents
} from "../../actions";
import Loader from "../../components/UI/Loader/Loader";
import Modal from 'react-responsive-modal';
import InputMask from "react-input-mask";
import isEmpty from "../../common-js/isEmpty";
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";
import MainButton from "../../components/UI/MainButton/MainButton";
import CustomSelect from "../../components/UI/Select/CustomSelect";
import editLogo from '../../assets/admin/edit.png'
import deleteLogo from '../../assets/admin/delete.png'
import './AdminGroups.scss'


class AdminGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupsFilter: {
                filterValue: '',
                filterType: 'by-name'
            },
            groupData: {
                id: null,
                name: '',
                department: {}
            },
            studentsFilter: {
                filterValue: '',
                filterType: 'by-name'
            },
            studentData: {
                id: null,
                name: '',
                surname: '',
                patronymic: '',
                group: {},
                budget: {},
                email: '',
                phone_number: ''
            },
            groupLoading: false,
            studentLoading: false,
            showCreateGroupModal: false,
            showUpdateGroupModal: false,
            showDeleteGroupModal: false,
            showCreateStudentModal: false,
            showUpdateStudentModal: false,
            showDeleteStudentModal: false,
            groupsScrollValue: 0,
            studentsScrollValue: 0
        }
    }

    groupsTableRef = React.createRef()
    studentsTableRef = React.createRef()

    componentDidMount() {
        const { dispatch } = this.props
        const { filterType, filterValue } = this.state.groupsFilter
        dispatch(getGroupsData(filterType, filterValue))
        dispatch(getDepartmentsData())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const groupsTable = this.groupsTableRef.current
        const studentsTable = this.studentsTableRef.current
        if (groupsTable) {
            groupsTable.scrollTop = this.state.groupsScrollValue
        }
        if (studentsTable) {
            studentsTable.scrollTop = this.state.studentsScrollValue
        }
    }

    scrollHandler = () => {
        const groupsTable = this.groupsTableRef.current
        const studentsTable = this.studentsTableRef.current
        if(groupsTable) {
            this.setState({
                groupsScrollValue: groupsTable.scrollTop
            })
        }
        if (studentsTable) {
            this.setState({
                studentsScrollValue: studentsTable.scrollTop
            })
        }
    }

    groupsFilterChangeHandler = e => {
        let groupsFilter = this.state.groupsFilter
        this.setState({
            groupsFilter: { ...groupsFilter, [e.target.name]: e.target.value }
        })
    }

    groupTextChangeHandler(e) {
        let groupData = this.state.groupData
        this.setState({
            groupData: { ...groupData, [e.target.name]: e.target.value }
        })
    }

    studentTextChangeHandler(e) {
        let studentData = this.state.studentData
        this.setState({
            studentData: { ...studentData, [e.target.name]: e.target.value }
        })
    }

    departmentChangeHandler(value) {
        const { groupData } = this.state
        this.setState({
            groupData: {
                ...groupData,
                department: value
            }
        })
    }

    groupChangeHandler(value) {
        const { studentData } = this.state
        this.setState({
            studentData: {
                ...studentData,
                group: value
            }
        })
    }

    budgetChangeHandler(value) {
        const { studentData } = this.state
        this.setState({
            studentData: {
                ...studentData,
                budget: value
            }
        })
    }

    studentsFilterChangeHandler = e => {
        let studentsFilter = this.state.studentsFilter
        this.setState({
            studentsFilter: { ...studentsFilter, [e.target.name]: e.target.value }
        })
    }

    rowClickHandler(group) {
        let groupData = this.state.groupData
        const { studentData } = this.state
        if (groupData.id !== group.id) {
            this.setState({
                groupData: {
                    ...groupData,
                    id: group.id,
                    name: group.name
                },
                studentData: {
                    ...studentData,
                    group
                }
            })
            const { dispatch } = this.props
            const { studentsFilter } = this.state
            dispatch(getStudentsData(studentsFilter.filterType, studentsFilter.filterValue, group.id))
        }
    }

    groupsFilterSubmit = () => {
        const { dispatch } = this.props
        const { filterValue, filterType } = this.state.groupsFilter
        dispatch(getGroupsData(filterType, filterValue))
    }

    studentsFilterSubmit = () => {
        const { dispatch } = this.props
        const { filterValue, filterType } = this.state.studentsFilter
        const { groupData } = this.state
        dispatch(getStudentsData(filterType, filterValue, groupData.id))
    }

    createGroupHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { name, department } = this.state.groupData
        const { filterType, filterValue } = this.state.groupsFilter
        const params = {
            name,
            department_id: department.id
        }
        this.hideCreateGroupModal()
        dispatch(requestGroups())
        Axios.post('api/groups/', params)
            .then(() => {
                dispatch(getGroupsData(filterType, filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    createStudentHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { name, surname, patronymic, group, budget, email, phone_number } = this.state.studentData
        const { filterType, filterValue } = this.state.studentsFilter
        const params = {
            name, surname, patronymic, email, phone_number,
            group_id: group.id,
            budget: budget.value
        }
        this.hideCreateStudentModal()
        dispatch(requestStudents())
        Axios.post('api/students/', params)
            .then(() => {
                dispatch(getStudentsData(filterType, filterValue, this.state.groupData.id))
            })
    }

    updateGroupHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id, name, department } = this.state.groupData
        const { filterType, filterValue } = this.state.groupsFilter
        const params = {
            id, name,
            department_id: department.id
        }
        this.hideUpdateGroupModal()
        dispatch(requestGroups())
        Axios.patch('api/groups/', params)
            .then(() => {
                dispatch(getGroupsData(filterType, filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    updateStudentHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const {  id , name, surname, patronymic, group, budget, email, phone_number  } = this.state.studentData
        const { filterType, filterValue } = this.state.studentsFilter
        const params = {
            id, name, surname, patronymic, email, phone_number,
            group_id: group.id,
            budget: budget.value
        }
        this.hideUpdateStudentModal()
        dispatch(requestStudents())
        Axios.patch('api/students/', params)
            .then(() => {
                dispatch(getStudentsData(filterType, filterValue, this.state.groupData.id))
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    deleteGroupHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.state.groupData
        const { filterType, filterValue } = this.state.groupsFilter
        this.hideDeleteGroupModal()
        dispatch(requestGroups())
        Axios.delete(`api/groups/${id}`)
            .then(() => {
                dispatch(getGroupsData(filterType, filterValue))
                this.setState({
                    groupData: {
                        id: null,
                        name: '',
                        department: {}
                    }
                })
            })
            .catch(err => console.log(err.response.data))
    }

    deleteStudentHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.state.studentData
        const { filterType, filterValue } = this.state.studentsFilter
        this.hideDeleteStudentModal()
        dispatch(requestStudents())
        Axios.delete(`api/students/${id}`)
            .then(() => {
                dispatch(getStudentsData(filterType, filterValue, this.state.groupData.id))
            })
            .catch(err => console.log(err.response.data))
    }

    hideCreateGroupModal() {
        const { groupData } = this.state
        this.setState({
            showCreateGroupModal: !this.state.showCreateGroupModal,
            groupData: {
                ...groupData,
                id: null,
                name: '',
                department: {}
            }
        })
    }

    hideCreateStudentModal() {
        const { studentData } = this.state
        this.setState({
            showCreateStudentModal: !this.state.showCreateStudentModal,
            studentData: {
                ...studentData,
                id: null,
                name: '',
                surname: '',
                patronymic: '',
                budget: {},
                email: '',
                phone_number: ''
            }
        })
    }

    hideUpdateGroupModal(id = null) {
        if (!this.state.showUpdateGroupModal) {
            this.setState({
                groupLoading: true
            })
            Axios.get(`api/groups/${id}`)
                .then(res => {
                    let groupData = this.state.groupData
                    this.setState({
                        groupData: {
                            ...groupData,
                            id: res.data.id,
                            name: res.data.name,
                            department: res.data.departments[0]
                        },
                        groupLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateGroupModal: !this.state.showUpdateGroupModal
        })
    }

    hideUpdateStudentModal(id = null) {
        if (!this.state.showUpdateStudentModal) {
            this.setState({
                studentLoading: true
            })
            Axios.get(`api/students/${id}`)
                .then(res => {
                    let studentData = this.state.studentData
                    let budget
                    if (res.data.budget) {
                        budget = {name: 'Бюджет', value: true}
                    } else {
                        budget =  {name: 'Контракт', value: false}
                    }
                    this.setState({
                        studentData: {
                            ...studentData,
                            id: res.data.id,
                            name: res.data.name,
                            surname: res.data.surname,
                            patronymic: res.data.patronymic,
                            budget: budget,
                            email: res.data.email,
                            phone_number: res.data.phone_number,
                            group: res.data.groups[0]
                        },
                        studentLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateStudentModal: !this.state.showUpdateStudentModal
        })
    }

    hideDeleteGroupModal() {
        this.setState({
            showDeleteGroupModal: !this.state.showDeleteGroupModal
        })
    }

    hideDeleteStudentModal(student=null) {
        if (!this.state.showDeleteStudentModal) {
            let studentData = this.state.studentData
            this.setState({
                studentData: { ...studentData, ...student }
            })
        }
        this.setState({
            showDeleteStudentModal: !this.state.showDeleteStudentModal
        })
    }

    renderGroupsTable() {
        const { groups, groupsLoading } = this.props
        if (groupsLoading) {
            return (<Loader/>)
        } else {
            if (groups.length === 0) {
                return (<p className='AdminGroups__not-found'>Группы не найдены</p>)
            }
            return (
                <div className="admin-table__wrap AdminGroups__groups-table">
                    <div className="admin-table">
                        <div className="admin-table__head">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                    <th style={{ fontSize: 24 }}>Группа</th>
                                    <th className='admin-table__department-cell'>Кафедра</th>
                                    <th className='admin-table__btn-cell'/>
                                    <th className='admin-table__btn-cell'/>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="admin-table__body" ref={this.groupsTableRef} onScroll={this.scrollHandler}>
                            <table>
                                <tbody>
                                { groups.map((el, index) => {
                                    return (
                                        <tr
                                            key={el.id}
                                            className={el.id === this.state.groupData.id ? 'AdminGroups__selected-row' : 'AdminGroups__row'}
                                            onClick={ () => this.rowClickHandler(el) }
                                        >
                                            <td className='admin-table__number'>{ index + 1 }</td>
                                            <td>{ el.name }</td>
                                            <td>{ el.departments[0].name }</td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__edit-btn'
                                                    onClick={ () => this.hideUpdateGroupModal(el.id) }
                                                >
                                                    <img src={editLogo} alt='Редактировать'/>
                                                </button>
                                            </td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__delete-btn'
                                                    onClick={ () => this.hideDeleteGroupModal() }
                                                >
                                                    <img src={deleteLogo} alt='Удалить'/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }) }
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
                                    <td className='admin-table__btn-cell'/>
                                    <td className='admin-table__btn-cell'/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderStudentsTable() {
        const { students, studentsLoading } = this.props
        if (studentsLoading) {
            return (<Loader/>)
        } else {
            if (students.length !== 0) {
                return (
                    <div className="admin-table__wrap AdminGroups__students-table">
                        <div className="admin-table">
                            <div className="admin-table__head">
                                <table>
                                    <thead>
                                    <tr>
                                        <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                        <th style={{ fontSize: 24 }}>ФИО</th>
                                        <th>Группа</th>
                                        <th>Бюджет/контракт</th>
                                        <th>E-mail</th>
                                        <th>Номер телефона</th>
                                        <th className='admin-table__btn-cell'/>
                                        <th className='admin-table__btn-cell'/>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="admin-table__body" ref={this.studentsTableRef} onScroll={this.scrollHandler}>
                                <table>
                                    <tbody>
                                    { students.map((el, index) => {
                                        return (
                                            <tr key={el.id}>
                                                <td className='admin-table__number'>{ index + 1 }</td>
                                                <td>{ `${el.surname} ${el.name} ${el.patronymic}` }</td>
                                                <td>{ el.group }</td>
                                                <td>{ el.budget ? 'Бюджет' : 'Контракт' }</td>
                                                <td>{ el.email }</td>
                                                <td>{ el.phone_number }</td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__edit-btn'
                                                        onClick={ () => this.hideUpdateStudentModal(el.id) }
                                                    >
                                                        <img src={editLogo} alt='Редактировать'/>
                                                    </button>
                                                </td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__delete-btn'
                                                        onClick={ () => this.hideDeleteStudentModal(el) }
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
                            <div className="admin-table__footer">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className='admin-table__number'/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td/>
                                        <td className='admin-table__btn-cell'/>
                                        <td className='admin-table__btn-cell'/>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (<p className='AdminGroups__empty-users'>Студенты не найдены</p>)
            }
        }
    }

    renderCreateGroupModal() {
        const { departments } = this.props
        return (
            <Modal
                onClose={ () => this.hideCreateGroupModal() }
                open={ this.state.showCreateGroupModal }
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createGroupHandler(e) } className='admin-post'>
                    <h3 className='admin-post__title'>Создание группы</h3>
                    <div className='admin-post__inputs'>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Группа</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='name'
                                value={this.state.groupData.name}
                                onChange={ e => this.groupTextChangeHandler(e) }
                                required
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Кафедра</p>
                            <CustomSelect
                                className='admin-post__select'
                                label={el => `${el.full_name}`}
                                value={el => el}
                                options={departments}
                                isSearchable
                                changeHandler={(value) => this.departmentChangeHandler(value)}
                                placeholder=''
                            />
                        </div>
                    </div>
                    <MainButton
                        type='submit'
                        className='admin-post__submit'
                        disabled={isEmpty(this.state.groupData.department) || this.state.groupData.name === '' }
                    >
                        Сохранить
                    </MainButton>
                </form>
            </Modal>
        )
    }

    renderCreateStudentModal() {
        const { groups } = this.props
        const { name, surname, patronymic, group, budget } = this.state.studentData
        return (
            <Modal
                onClose={ () => this.hideCreateStudentModal() }
                open={this.state.showCreateStudentModal}
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createStudentHandler(e) } className='admin-post'>
                    <h3 className='admin-post__title'>Создание студента</h3>
                    <div className='admin-post__inputs'>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Имя</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='name'
                                value={this.state.studentData.name}
                                onChange={ e => this.studentTextChangeHandler(e) }
                                required
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Фамилия</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='surname'
                                value={this.state.studentData.surname}
                                onChange={ e => this.studentTextChangeHandler(e) }
                                required
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Отчество</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='patronymic'
                                value={this.state.studentData.patronymic}
                                onChange={ e => this.studentTextChangeHandler(e) }
                                required
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Группа</p>
                            <CustomSelect
                                className='admin-post__select'
                                label={el => `${el.name}`}
                                value={el => el}
                                options={groups}
                                isSearchable
                                changeHandler={(value) => this.groupChangeHandler(value)}
                                placeholder=''
                                defaultValue={this.state.studentData.group}
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Бюджет</p>
                            <CustomSelect
                                className='admin-post__select'
                                label={el => `${el.name}`}
                                value={el => el.value}
                                options={[{name: 'Бюджет', value: true}, {name: 'Контракт', value: false}]}
                                isSearchable
                                changeHandler={(value) => this.budgetChangeHandler(value)}
                                placeholder=''
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">E-mail</p>
                            <input
                                className='crud-input-text'
                                type="mail"
                                name='email'
                                value={this.state.studentData.email}
                                onChange={ e => this.studentTextChangeHandler(e) }
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Номер телефона</p>
                            <InputMask
                                type="tel"
                                className='crud-input-text'
                                name="phone_number"
                                onChange={ (e) => this.studentTextChangeHandler(e) }
                                value={ this.state.studentData.phone_number }
                                mask='+3\8 (999) 99 99 999'
                            />
                        </div>
                    </div>
                    <MainButton
                        type='submit'
                        className='admin-post__submit'
                        disabled={ isEmpty(group) || isEmpty(budget) || (name === '' || surname === '' || patronymic === '')}
                        >
                        Сохранить
                    </MainButton>
                </form>
            </Modal>
        )
    }

    renderUpdateGroupModal() {
        const { department } = this.state.groupData
        const { groupLoading } = this.state
        const { departments } = this.props
        return (
            <Modal
                onClose={ () => this.hideUpdateGroupModal() }
                open={ this.state.showUpdateGroupModal }
                center
                animationDuration={250}
            >
                {isEmpty(department) || groupLoading ? <Loader/> :
                    <form onSubmit={ e => this.updateGroupHandler(e) } className='admin-post'>
                        <h3 className='admin-post__title'>Редактирование</h3>
                        <div className='admin-post__inputs'>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Группа</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='name'
                                    value={this.state.groupData.name}
                                    onChange={ e => this.groupTextChangeHandler(e) }
                                    required
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Кафедра</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.full_name}`}
                                    value={el => el}
                                    options={departments}
                                    isSearchable
                                    changeHandler={(value) => this.departmentChangeHandler(value)}
                                    placeholder=''
                                    defaultValue={this.state.groupData.department}
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
        )
    }

    renderUpdateStudentModal() {
        const { group } = this.state.studentData
        const { studentLoading } = this.state
        const { groups } = this.props
        return (
            <Modal
                onClose={ () => this.hideUpdateStudentModal() }
                open={this.state.showUpdateStudentModal}
                center
                animationDuration={250}
            >
                {isEmpty(group) || studentLoading ? <Loader/> :
                    <form onSubmit={ e => this.updateStudentHandler(e) } className='admin-post'>
                        <h3 className='admin-post__title'>Редактирование</h3>
                        <div className='admin-post__inputs'>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Имя</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='name'
                                    value={this.state.studentData.name}
                                    onChange={ e => this.studentTextChangeHandler(e) }
                                    required
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Фамилия</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='surname'
                                    value={this.state.studentData.surname}
                                    onChange={ e => this.studentTextChangeHandler(e) }
                                    required
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Отчество</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='patronymic'
                                    value={this.state.studentData.patronymic}
                                    onChange={ e => this.studentTextChangeHandler(e) }
                                    required
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Группа</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.name}`}
                                    value={el => el}
                                    options={groups}
                                    isSearchable
                                    changeHandler={(value) => this.groupChangeHandler(value)}
                                    placeholder=''
                                    defaultValue={this.state.studentData.group}
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Бюджет</p>
                                <CustomSelect
                                    className='admin-post__select'
                                    label={el => `${el.name}`}
                                    value={el => el.value}
                                    options={[{name: 'Бюджет', value: true}, {name: 'Контракт', value: false}]}
                                    isSearchable
                                    changeHandler={(value) => this.budgetChangeHandler(value)}
                                    placeholder=''
                                    defaultValue={this.state.studentData.budget}
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">E-mail</p>
                                <input
                                    className='crud-input-text'
                                    type="mail"
                                    name='email'
                                    value={this.state.studentData.email}
                                    onChange={ e => this.studentTextChangeHandler(e) }
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Номер телефона</p>
                                <InputMask
                                    type="tel"
                                    className='crud-input-text'
                                    name="phone_number"
                                    onChange={ (e) => this.studentTextChangeHandler(e) }
                                    value={ this.state.studentData.phone_number }
                                    mask='+3\8 (999) 99 99 999'
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
        )
    }

    renderDeleteGroupModal() {
        return (
            <Modal
                onClose={ () => this.hideDeleteGroupModal() }
                open={ this.state.showDeleteGroupModal }
                center
                animationDuration={250}
                modalId='delete-group-modal'
            >
                <form
                    onSubmit={ e => this.deleteGroupHandler(e) }
                    className='admin-delete'
                >
                    <p className='admin-delete__text'>
                        Вы уверенны что хотите удалить группу
                        <span>{this.state.groupData.name}?</span>
                        <span className="admin-delete__warning">Внимание! Данное действие приведёт к удалению всех связанных данных с выбранной записью.</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteGroupModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    renderDeleteStudentModal() {
        return (
            <Modal
                onClose={ () => this.hideDeleteStudentModal() }
                open={ this.state.showDeleteStudentModal }
                center
                animationDuration={ 250 }
                modalId='delete-student-modal'
            >
                <form
                    onSubmit={ e => this.deleteStudentHandler(e) }
                    className='admin-delete'
                >
                    <p className='admin-delete__text'>
                        Вы уверенны что хотите удалить студента
                        <span>{`${this.state.studentData.surname} ${this.state.studentData.name}  ${this.state.studentData.patronymic}`}?</span>
                        <span className="admin-delete__warning">Внимание! Данное действие приведёт к удалению всех связанных данных с выбранной записью.</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteStudentModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    render() {
        return (
            <div className='AdminGroups'>
                <div className="AdminGroups__groups-wrap">
                    <div className="AdminGroups__filter">
                        <div className="AdminGroups__search">
                            <FilterSearch
                                options={[
                                    { name: 'По названию', value: 'by-name' },
                                    { name: 'По кафедре', value: 'by-department' },
                                ]}
                                height={35}
                                changeHandler={ this.groupsFilterChangeHandler }
                                inputName='filterValue'
                                selectName='filterType'
                            />
                        </div>
                        <div className="AdminGroups__buttons">
                            <MainButton
                                className='AdminGroups__filter-btn'
                                onClick={ () => this.groupsFilterSubmit() }
                            >
                                Найти
                            </MainButton>
                            <MainButton
                                className='AdminGroups__add-group-btn'
                                onClick={ () => this.hideCreateGroupModal() }
                            >
                                Создать группу
                            </MainButton>
                        </div>
                    </div>
                    {this.renderGroupsTable()}
                </div>
                <div className="AdminGroups__students-wrap">
                    { !this.state.groupData.id ? null :
                        <div className="AdminGroups__filter">
                            <div className="AdminGroups__search">
                                <FilterSearch
                                    options={[
                                        { name: 'По фио', value: 'by-name' },
                                        { name: 'Бюджет/контракт', value: 'by-budget' },
                                    ]}
                                    height={35}
                                    changeHandler={ this.studentsFilterChangeHandler }
                                    inputName='filterValue'
                                    selectName='filterType'
                                />
                            </div>
                            <div className="AdminGroups__buttons">
                                <MainButton
                                    className='AdminGroups__filter-btn'
                                    onClick={ () => this.studentsFilterSubmit() }
                                >
                                    Найти
                                </MainButton>
                                <MainButton
                                    className='AdminGroups__add-group-btn'
                                    onClick={ () => this.hideCreateStudentModal() }
                                >
                                    Создать студента
                                </MainButton>
                            </div>
                        </div>
                    }
                    { !this.state.groupData.id ? <p className='AdminGroups__select-group'>Выберите группу</p> : this.renderStudentsTable()  }
                </div>
                { this.renderCreateGroupModal() }
                { this.renderUpdateGroupModal() }
                { this.renderDeleteGroupModal() }
                { this.renderCreateStudentModal() }
                { this.renderUpdateStudentModal() }
                { this.renderDeleteStudentModal() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.entities.groups,
        students: state.entities.students,
        departments: state.entities.departments,
        groupsLoading: state.entities.groupsLoading,
        studentsLoading: state.entities.studentsLoading
    }
}

export default connect(mapStateToProps)(AdminGroups)