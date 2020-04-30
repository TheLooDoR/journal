import React, { Component } from "react";
import { connect } from 'react-redux'
import Axios from "axios";
import {getDepartmentsData, getGroupsData} from "../../actions";
import Loader from "../../components/UI/Loader/Loader";
import Modal from 'react-responsive-modal';
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";
import MainButton from "../../components/UI/MainButton/MainButton";

import editLogo from '../../assets/admin/edit.png'
import deleteLogo from '../../assets/admin/delete.png'
import isEmpty from "../../common-js/isEmpty";
import Select from "../../components/UI/Select/Select";
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
                filterType: ''
            },
            studentData: {
                id: null,
                name: '',
                group: {},
                budget: null,
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
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        const { filterType, filterValue } = this.state.groupsFilter
        dispatch(getGroupsData(filterType, filterValue))
        dispatch(getDepartmentsData())
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

    groupSelectChangeHandler(e) {
        let groupData = this.state.groupData
        this.setState({
            group: { ...groupData, [e.target.name]: JSON.parse(e.target.value) }
        })
    }

    rowClickHandler(group) {

        let groupData = this.state.groupData
        this.setState({
            groupData: {
                ...groupData,
                id: group.id,
                name: group.name
            }
        })
    }

    groupsFilterSubmit = () => {
        const { dispatch } = this.props
        const { filterValue, filterType } = this.state.groupsFilter
        dispatch(getGroupsData(filterType, filterValue))
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
        Axios.patch('api/groups/', params)
            .then(() => {
                this.hideUpdateGroupModal()
                dispatch(getGroupsData(filterType, filterValue))
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
        Axios.delete(`api/groups/${id}`)
            .then(() => {
                this.hideDeleteGroupModal()
                dispatch(getGroupsData(filterType, filterValue))
            })
            .catch(err => console.log(err.response.data))
    }

    hideCreateGroupModal() {
        this.setState({
            showCreateGroupModal: !this.state.showCreateGroupModal
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

    hideDeleteGroupModal() {
        this.setState({
            showDeleteGroupModal: !this.state.showDeleteGroupModal
        })
    }

    renderGroupsTable() {
        const { groups, groupsLoading } = this.props
        if (groupsLoading) {
            return (<Loader/>)
        } else {
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
                        <div className="admin-table__body">
                            <table>
                                <tbody>
                                { groups.map((el, index) => {
                                    return (
                                        <tr
                                            key={el.id}
                                            className={el.id === this.state.groupData.id ? 'AdminGroups__selected-row' : 'AdminGroups__row'}
                                            onClick={ () => this.rowClickHandler({id: el.id, name: el.name}) }
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
                    <div className="admin-table__body">
                        <table>
                            <tbody>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='admin-table__number'>1</td>
                                    <td>Абаров Павел Сергеевич</td>
                                    <td>КН-316а</td>
                                    <td>Бюджет</td>
                                    <td>alinka@gmail.com</td>
                                    <td>+38 (095) 77 81 563</td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__edit-btn'
                                        >
                                            <img src={editLogo} alt='Редактировать'/>
                                        </button>
                                    </td>
                                    <td className='admin-table__btn-cell'>
                                        <button
                                            className='admin-table__delete-btn'
                                        >
                                            <img src={deleteLogo} alt='Удалить'/>
                                        </button>
                                    </td>
                                </tr>
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
    }

    renderCreateGroupModal() {

        return (
            <Modal
                onClose={ () => this.hideCreateGroupModal() }
                open={ this.state.showCreateGroupModal }
                center
                animationDuration={250}
            >
                <p>create</p>
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
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Кафедра</p>
                                <Select
                                    name='department'
                                    changeHandler={ e => this.groupSelectChangeHandler(e) }
                                    defaultValue={ JSON.stringify(this.state.groupData.department) }
                                    placeholder
                                    options={
                                        departments.map(el => {
                                            return (
                                                <option key={el.id} value={JSON.stringify(el)}>{el.full_name}</option>
                                            )
                                        })
                                    }
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
                        Вы уверены что хотите удалить группу
                        <span>{this.state.groupData.name}</span>
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
                    <div className="AdminGroups__filter">
                        <div className="AdminGroups__search">
                            <FilterSearch
                                options={[
                                    { name: 'По фамилии', value: 'by-surname' },
                                    { name: 'По имени', value: 'by-name' },
                                ]}
                                height={35}
                            />
                        </div>
                        <div className="AdminGroups__buttons">
                            <MainButton
                                className='AdminGroups__filter-btn'
                            >
                                Найти
                            </MainButton>
                            <MainButton
                                className='AdminGroups__add-group-btn'
                            >
                                Создать студента
                            </MainButton>
                        </div>
                    </div>
                    {this.renderStudentsTable()}
                </div>
                { this.renderCreateGroupModal() }
                { this.renderUpdateGroupModal() }
                { this.renderDeleteGroupModal() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.entities.groups,
        departments: state.entities.departments,
        groupsLoading: state.entities.isLoading
    }
}

export default connect(mapStateToProps)(AdminGroups)