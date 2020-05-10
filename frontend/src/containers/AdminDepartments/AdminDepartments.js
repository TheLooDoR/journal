import React, {Component} from "react";
import Axios from "axios";
import {connect} from 'react-redux'
import {getDepartmentsData, requestDepartments} from "../../actions";
import Loader from "../../components/UI/Loader/Loader";
import editLogo from "../../assets/admin/edit.png";
import deleteLogo from "../../assets/admin/delete.png";
import './AdminDepartments.scss'
import Modal from "react-responsive-modal";
import MainButton from "../../components/UI/MainButton/MainButton";
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";

class AdminDepartments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentData: {
                id: null,
                name: '',
                full_name: ''
            },
            departmentsFilter: {
                filterValue: ''
            },
            departmentLoading: false,
            showCreateDepartmentModal: false,
            showUpdateDepartmentModal: false,
            showDeleteDepartmentModal: false,
            scrollValue: 0
        }
    }

    tableRef = React.createRef()

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDepartmentsData(this.state.departmentsFilter.filterValue))
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

    departmentsFilterChangeHandler = e => {
        const { departmentsFilter } = this.state
        this.setState({
            departmentsFilter: {
                ...departmentsFilter,
                [e.target.name]: e.target.value
            }
        })
    }

    departmentsFilterSubmit() {
        const { dispatch } = this.props
        const { filterValue } = this.state.departmentsFilter
        dispatch(getDepartmentsData(filterValue))
    }

    departmentTextChangeHandler(e) {
        const { departmentData } = this.state
        this.setState({
            departmentData: {
                ...departmentData,
                [e.target.name]: e.target.value
            }
        })
    }

    createDepartmentHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { name, full_name } = this.state.departmentData
        const { filterValue } = this.state.departmentsFilter
        const data = { name, full_name }
        this.hideCreateDepartmentModal()
        dispatch(requestDepartments())
        Axios.post('api/departments', data)
            .then(() => {
                dispatch(getDepartmentsData(filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    updateDepartmentHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id, name, full_name } = this.state.departmentData
        const { filterValue } = this.state.departmentsFilter
        const params = { id, name, full_name }
        this.hideUpdateDepartmentModal()
        dispatch(requestDepartments())
        Axios.patch('api/departments/', params)
            .then(() => {
                dispatch(getDepartmentsData(filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    deleteDepartmentHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.state.departmentData
        const { filterValue } = this.state.departmentsFilter
        this.hideDeleteDepartmentModal()
        dispatch(requestDepartments())
        Axios.delete(`api/departments/${id}`)
            .then(() => {
                dispatch(getDepartmentsData(filterValue))
            })
            .catch(err => console.log(err.response.data))
    }

    hideCreateDepartmentModal() {
        const { departmentData } = this.state
        this.setState({
            departmentData: {
                ...departmentData,
                id: null,
                name: '',
                full_name: ''
            },
            showCreateDepartmentModal: !this.state.showCreateDepartmentModal
        })
    }

    hideUpdateDepartmentModal(id=null) {
        if (!this.state.showUpdateDepartmentModal) {
            this.setState({
                departmentLoading: true
            })
            Axios.get(`api/departments/${id}`)
                .then(res => {
                    const { departmentData } = this.state
                    this.setState({
                        departmentData: {
                            ...departmentData,
                            id: res.data.id,
                            name: res.data.name,
                            full_name: res.data.full_name
                        },
                        departmentLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateDepartmentModal: !this.state.showUpdateDepartmentModal
        })
    }

    hideDeleteDepartmentModal(department=null) {
        if (!this.state.showDeleteDepartmentModal) {
            const { departmentData } = this.state
            this.setState({
                departmentData: {
                    ...departmentData,
                    ...department
                }
            })
        }
        this.setState({
            showDeleteDepartmentModal: !this.state.showDeleteDepartmentModal
        })
    }

    renderDepartmentsTable() {
        const { departments, departmentsLoading } = this.props
        if (departmentsLoading) {
            return (<Loader/>)
        } else {
            if (departments.length === 0) {
                return (<p className='AdminDepartments__not-found'>Корпуса не найдены</p>)
            }
            return (
                <div className='admin-table__wrap AdminDepartments__departments-table'>
                    <div className="admin-table">
                        <div className="admin-table__head">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                    <th className='admin-table__department-cell'>Название</th>
                                    <th className='admin-table__department-cell'>Полное название</th>
                                    <th className='admin-table__btn-cell'/>
                                    <th className='admin-table__btn-cell'/>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="admin-table__body" ref={this.tableRef} onScroll={this.scrollHandler}>
                            <table>
                                <tbody>
                                { departments.map((el, index) => {
                                    return (
                                        <tr key={el.id}>
                                            <td className='admin-table__number'>{ index + 1 }</td>
                                            <td>{ el.name }</td>
                                            <td>{ el.full_name }</td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__edit-btn'
                                                    onClick={ () => this.hideUpdateDepartmentModal(el.id) }
                                                >
                                                    <img src={editLogo} alt='Редактировать'/>
                                                </button>
                                            </td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__delete-btn'
                                                    onClick={ () => this.hideDeleteDepartmentModal(el) }
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

    renderCreateDepartmentModal() {
        return (
            <Modal
                onClose={ () => this.hideCreateDepartmentModal() }
                open={this.state.showCreateDepartmentModal}
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createDepartmentHandler(e) } className='admin-post'>
                    <h3 className='admin-post__title'>Создание кафедры</h3>
                    <div className="admin-post__inputs">
                        <div className="admin-post__input">
                            <p className="admin-post__label">Название</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='name'
                                value={this.state.departmentData.name}
                                onChange={ e => this.departmentTextChangeHandler(e) }
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Полное название</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='full_name'
                                value={this.state.departmentData.full_name}
                                onChange={ e => this.departmentTextChangeHandler(e) }
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
            </Modal>
        )
    }

    renderUpdateDepartmentModal() {
        const { departmentLoading } = this.state
        return (
            <Modal
                onClose={ () => this.hideUpdateDepartmentModal() }
                open={this.state.showUpdateDepartmentModal}
                center
                animationDuration={250}
            >
                {departmentLoading ? <Loader/> :
                    <form className='admin-post' onSubmit={ e => this.updateDepartmentHandler(e)}>
                        <h3 className="admin-post__title">Редактирование</h3>
                        <div className="admin-post__inputs">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Название</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='name'
                                    value={this.state.departmentData.name}
                                    onChange={ e => this.departmentTextChangeHandler(e) }
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Полное название</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='full_name'
                                    value={this.state.departmentData.full_name}
                                    onChange={ e => this.departmentTextChangeHandler(e) }
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

    renderDeleteDepartmentModal() {
        return (
            <Modal
                onClose={ () => this.hideDeleteDepartmentModal() }
                open={this.state.showDeleteDepartmentModal}
                center
                animationDuration={250}
                modalId='delete-department-modal'
            >
                <form className="admin-delete" onSubmit={ e => this.deleteDepartmentHandler(e) }>
                    <p className='admin-delete__text'>
                        Вы уверенны что хотите удалить корпус
                        <span>{this.state.departmentData.full_name}</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteDepartmentModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    render() {
        return (
            <div className='AdminDepartments'>
                <div className="AdminDepartments__departments-wrap">
                    <div className="AdminDepartments__filter">
                        <div className="AdminDepartments__search">
                            <FilterSearch
                                height={35}
                                disableSelect
                                changeHandler={this.departmentsFilterChangeHandler}
                                inputName='filterValue'
                            />
                        </div>
                        <div className="AdminDepartments__buttons">
                            <MainButton
                                className='AdminDepartments__filter-btn'
                                onClick={ () => this.departmentsFilterSubmit() }
                            >
                                Найти
                            </MainButton>
                            <MainButton
                                className='AdminDepartments__add-department-btn'
                                onClick={ () => this.hideCreateDepartmentModal() }
                            >
                                Создать кафедру
                            </MainButton>
                        </div>
                    </div>
                    { this.renderDepartmentsTable() }
                </div>
                {this.renderCreateDepartmentModal()}
                {this.renderUpdateDepartmentModal()}
                {this.renderDeleteDepartmentModal()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        departments: state.entities.departments,
        departmentsLoading: state.entities.departmentsLoading
    }
}

export default connect(mapStateToProps)(AdminDepartments)