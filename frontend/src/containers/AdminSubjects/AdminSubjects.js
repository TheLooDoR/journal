import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from "axios";
import Modal from 'react-responsive-modal';
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";
import MainButton from "../../components/UI/MainButton/MainButton";
import Loader from "../../components/UI/Loader/Loader";
import {getSubjectsData, getSubjectTypesData, requestSubjects, requestSubjectTypes} from "../../actions";
import editLogo from "../../assets/admin/edit.png";
import deleteLogo from "../../assets/admin/delete.png";
import './AdminSubjects.scss'

class AdminSubjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjectData: {
                id: null,
                name: '',
                full_name: ''
            },
            subjectTypeData: {
                id: null,
                name: ''
            },
            subjectsFilter: {
                filterValue: ''
            },
            subjectTypesFilter: {
                filterValue: ''
            },
            subjectLoading: false,
            subjectTypeLoading: false,
            showCreateSubjectModal: false,
            showUpdateSubjectModal: false,
            showDeleteSubjectModal: false,
            showCreateSubjectTypeModal: false,
            showUpdateSubjectTypeModal: false,
            showDeleteSubjectTypeModal: false,
            subjectsScrollValue: 0,
            subjectTypesScrollValue: 0
        }
    }

    subjectsTableRef = React.createRef()
    subjectTypesTableRef = React.createRef()

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getSubjectsData(this.state.subjectsFilter.filterValue))
        dispatch(getSubjectTypesData(this.state.subjectTypesFilter.filterValue))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const subjectsTable = this.subjectsTableRef.current
        const subjectTypesTable = this.subjectTypesTableRef.current
        if (subjectsTable) {
            subjectsTable.scrollTop = this.state.subjectsScrollValue
        }
        if (subjectTypesTable) {
            subjectTypesTable.scrollTop = this.state.subjectTypesScrollValue
        }
    }

    scrollHandler = () => {
        const subjectsTable = this.subjectsTableRef.current
        const subjectTypesTable = this.subjectTypesTableRef.current
        if(subjectsTable) {
            this.setState({
                subjectsScrollValue: subjectsTable.scrollTop
            })
        }
        if (subjectTypesTable) {
            this.setState({
                subjectTypesScrollValue: subjectTypesTable.scrollTop
            })
        }
    }

    subjectsFilterChangeHandler = e => {
        let subjectsFilter = this.state.subjectsFilter
        this.setState({
            subjectsFilter: {
                ...subjectsFilter,
                [e.target.name]: e.target.value
            }
        })
    }

    subjectTypesFilterChangeHandler = e => {
        let subjectTypesFilter = this.state.subjectTypesFilter
        this.setState({
            subjectTypesFilter: {
                ...subjectTypesFilter,
                [e.target.name]: e.target.value
            }
        })
    }

    subjectsFilterSubmit() {
        const { dispatch } = this.props
        const { filterValue } = this.state.subjectsFilter
        dispatch(getSubjectsData(filterValue))
    }

    subjectTypesFilterSubmit() {
        const { dispatch } = this.props
        const { filterValue } = this.state.subjectTypesFilter
        dispatch(getSubjectTypesData(filterValue))
    }

    subjectTextChangeHandler(e) {
        let subjectData = this.state.subjectData
        this.setState({
            subjectData: { ...subjectData, [e.target.name]: e.target.value }
        })
    }

    subjectTypeTextChangeHandler(e) {
        let subjectTypeData = this.state.subjectTypeData
        this.setState({
            subjectTypeData: { ...subjectTypeData, [e.target.name]: e.target.value }
        })
    }

    createSubjectHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { name, full_name } = this.state.subjectData
        const { filterValue } = this.state.subjectsFilter
        const data = {
            name, full_name
        }
        this.hideCreateSubjectModal()
        dispatch(requestSubjects())
        Axios.post('api/subjects', data)
            .then(res => {
                dispatch(getSubjectsData(filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    createSubjectTypeHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { name } = this.state.subjectTypeData
        const { filterValue } = this.state.subjectTypesFilter
        const data = { name }
        this.hideCreateSubjectTypeModal()
        dispatch(requestSubjectTypes())
        Axios.post('api/subject-types', data)
            .then(() => {
                dispatch(getSubjectTypesData(filterValue))
            })
            .catch(err => console.log(err.response.data))
    }

    updateSubjectHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id, name, full_name } = this.state.subjectData
        const { filterValue } = this.state.subjectsFilter
        const params = { id, name, full_name }
        this.hideUpdateSubjectModal()
        dispatch(requestSubjects())
        Axios.patch('api/subjects/', params)
            .then(() => {
                dispatch(getSubjectsData(filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    updateSubjectTypeHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id, name } = this.state.subjectTypeData
        const { filterValue } = this.state.subjectTypesFilter
        const params = { id, name }
        this.hideUpdateSubjectTypeModal()
        dispatch(requestSubjectTypes())
        Axios.patch('api/subject-types/', params)
            .then(() => {
                dispatch(getSubjectTypesData(filterValue))
            })
            .catch(err => connect.log(err.response.data))
    }

    deleteSubjectHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.state.subjectData
        const { filterValue } = this.state.subjectsFilter
        this.hideDeleteSubjectModal()
        dispatch(requestSubjects())
        Axios.delete(`api/subjects/${id}`)
            .then(() => {
                dispatch(getSubjectsData(filterValue))
            })
            .catch(err => console.log(err.response.data))
    }

    deleteSubjectTypesHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.state.subjectTypeData
        const { filterValue } = this.state.subjectTypesFilter
        this.hideDeleteSubjectTypeModal()
        dispatch(requestSubjectTypes())
        Axios.delete(`api/subject-types/${id}`)
            .then(() => {
                dispatch(getSubjectTypesData(filterValue))
            })
    }

    hideCreateSubjectModal() {
        const { subjectData } = this.state
        this.setState({
            subjectData: {
                ...subjectData,
                id: null,
                name: '',
                full_name: ''
            },
            showCreateSubjectModal: !this.state.showCreateSubjectModal
        })
    }

    hideCreateSubjectTypeModal() {
        const { subjectTypeData } = this.state
        this.setState({
            subjectTypeData: {
                ...subjectTypeData,
                id: null,
                name: ''
            },
            showCreateSubjectTypeModal: !this.state.showCreateSubjectTypeModal
        })
    }

    hideUpdateSubjectModal(id = null) {
        if (!this.state.showUpdateSubjectModal) {
            this.setState({
                subjectLoading: true
            })
            Axios.get(`api/subjects/${id}`)
                .then(res => {
                    let subjectData = this.state.subjectData
                    this.setState({
                        subjectData: {
                            ...subjectData,
                            id: res.data.id,
                            name: res.data.name,
                            full_name: res.data.full_name
                        },
                        subjectLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateSubjectModal: !this.state.showUpdateSubjectModal
        })
    }

    hideUpdateSubjectTypeModal(id = null) {
        if (!this.state.showUpdateSubjectTypeModal) {
            this.setState({
                subjectTypeLoading: true
            })
            Axios.get(`api/subject-types/${id}`)
                .then(res => {
                    let subjectTypeData = this.state.subjectTypeData
                    this.setState({
                        subjectTypeData: {
                            ...subjectTypeData,
                            id: res.data.id,
                            name: res.data.name
                        },
                        subjectTypeLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateSubjectTypeModal: !this.state.showUpdateSubjectTypeModal
        })
    }

    hideDeleteSubjectModal(subject=null) {
        if (!this.state.showDeleteSubjectModal) {
            let subjectData = this.state.subjectData
            this.setState({
                subjectData: {
                    ...subjectData,
                    ...subject
                }
            })
        }
        this.setState({
            showDeleteSubjectModal: !this.state.showDeleteSubjectModal
        })
    }

    hideDeleteSubjectTypeModal(subjectType=null) {
        if (!this.state.showDeleteSubjectTypeModal) {
            let subjectTypeData = this.state.subjectTypeData
            this.setState({
                subjectTypeData: {
                    ...subjectTypeData,
                    ...subjectType
                }
            })
        }
        this.setState({
            showDeleteSubjectTypeModal: !this.state.showDeleteSubjectTypeModal
        })
    }

    renderSubjectsTable() {
        const { subjects, subjectsLoading } = this.props
        if (subjectsLoading) {
            return (<Loader/>)
        } else {
            if (subjects.length === 0) {
                return (<p className='AdminSubjects__not-found'>Дисциплины не найдены</p>)
            }
            return (
                <div className='admin-table__wrap AdminSubjects__subjects-table'>
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
                        <div className="admin-table__body" ref={this.subjectsTableRef} onScroll={this.scrollHandler}>
                            <table>
                                <tbody>
                                    { subjects.map((el, index) => {
                                        return (
                                            <tr key={el.id}>
                                                <td className='admin-table__number'>{ index + 1 }</td>
                                                <td>{ el.name }</td>
                                                <td>{  el.full_name}</td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__edit-btn'
                                                        onClick={ () => this.hideUpdateSubjectModal(el.id) }
                                                    >
                                                        <img src={editLogo} alt='Редактировать'/>
                                                    </button>
                                                </td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__delete-btn'
                                                        onClick={ () => this.hideDeleteSubjectModal(el) }
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

    renderSubjectTypesTable() {
        const { subjectTypes, subjectTypesLoading } = this.props
        if (subjectTypesLoading) {
            return (<Loader/>)
        } else {
            if (subjectTypes.length === 0) {
                return (<p className='AdminSubjects__not-found'>Типы занятий не найдены</p>)
            }
            return (
                <div className='admin-table__wrap AdminSubjects__subject-types-table'>
                    <div className="admin-table">
                        <div className="admin-table__head">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                    <th className='admin-table__department-cell'>Название</th>
                                    <th className='admin-table__btn-cell'/>
                                    <th className='admin-table__btn-cell'/>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="admin-table__body" ref={this.subjectTypesTableRef} onScroll={this.scrollHandler}>
                            <table>
                                <tbody>
                                { subjectTypes.map((el, index) => {
                                    return (
                                        <tr key={el.id}>
                                            <td className='admin-table__number'>{ index + 1 }</td>
                                            <td>{ el.name }</td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__edit-btn'
                                                    onClick={ () => this.hideUpdateSubjectTypeModal(el.id) }
                                                >
                                                    <img src={editLogo} alt='Редактировать'/>
                                                </button>
                                            </td>
                                            <td className='admin-table__btn-cell'>
                                                <button
                                                    className='admin-table__delete-btn'
                                                    onClick={ () => this.hideDeleteSubjectTypeModal(el) }
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

    renderCreateSubjectModal() {
        return (
            <Modal
                onClose={ () => this.hideCreateSubjectModal() }
                open={this.state.showCreateSubjectModal}
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createSubjectHandler(e) } className='admin-post'>
                    <h3 className='admin-post__title'>Создание дисциплины</h3>
                    <div className="admin-post__inputs">
                        <div className="admin-post__input">
                            <p className="admin-post__label">Название</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='name'
                                value={this.state.subjectData.name}
                                onChange={ e => this.subjectTextChangeHandler(e) }
                                required
                            />
                        </div>
                        <div className="admin-post__input">
                            <p className="admin-post__label">Полное название</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='full_name'
                                value={this.state.subjectData.full_name}
                                onChange={ e => this.subjectTextChangeHandler(e) }
                                required
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

    renderCreateSubjectTypeModal() {
        return (
            <Modal
                onClose={ () => this.hideCreateSubjectTypeModal() }
                open={this.state.showCreateSubjectTypeModal}
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createSubjectTypeHandler(e) } className='admin-post'>
                    <h3 className='admin-post__title'>Создание типа дисциплины</h3>
                    <div className="admin-post__inputs">
                        <div className="admin-post__input">
                            <p className="admin-post__label">Название</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='name'
                                value={this.state.subjectTypeData.name}
                                onChange={ e => this.subjectTypeTextChangeHandler(e) }
                                required
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

    renderUpdateSubjectModal() {
        const { subjectLoading } = this.state
        return (
            <Modal
                onClose={ () => this.hideUpdateSubjectModal() }
                open={ this.state.showUpdateSubjectModal }
                center
                animationDuration={250}
            >
                {subjectLoading ? <Loader/> :
                    <form onSubmit={ e => this.updateSubjectHandler(e) } className='admin-post'>
                        <h3 className='admin-post__title'>Редактирование</h3>
                        <div className="admin-post__inputs">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Название</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='name'
                                    value={this.state.subjectData.name}
                                    onChange={ e => this.subjectTextChangeHandler(e) }
                                    required
                                />
                            </div>
                            <div className="admin-post__input">
                                <p className="admin-post__label">Полное название</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='full_name'
                                    value={this.state.subjectData.full_name}
                                    onChange={ e => this.subjectTextChangeHandler(e) }
                                    required
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

    renderUpdateSubjectTypeModal() {
        const { subjectTypeLoading } = this.state
        return (
            <Modal
                onClose={ () => this.hideUpdateSubjectTypeModal() }
                open={ this.state.showUpdateSubjectTypeModal }
                center
                animationDuration={250}
            >
                {subjectTypeLoading ? <Loader/> :
                    <form onSubmit={ e => this.updateSubjectTypeHandler(e) } className='admin-post'>
                        <h3 className='admin-post__title'>Редактирование</h3>
                        <div className="admin-post__inputs">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Название</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='name'
                                    value={this.state.subjectTypeData.name}
                                    onChange={ e => this.subjectTypeTextChangeHandler(e) }
                                    required
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

    renderDeleteSubjectModal() {
        return (
            <Modal
                onClose={ () => this.hideDeleteSubjectModal() }
                open={ this.state.showDeleteSubjectModal }
                center
                animationDuration={250}
                modalId='delete-subject-modal'
            >
                <form
                    onSubmit={ e => this.deleteSubjectHandler(e) }
                    className='admin-delete'
                >
                    <p className='admin-delete__text'>
                        Вы уверенны что хотите удалить дисциплину
                        <span>{this.state.subjectData.full_name}?</span>
                        <span className="admin-delete__warning">Внимание! Данное действие приведёт к удалению всех связанных данных с выбранной записью.</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteSubjectModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    renderDeleteSubjectTypeModal() {
        return (
            <Modal
                onClose={ () => this.hideDeleteSubjectTypeModal() }
                open={ this.state.showDeleteSubjectTypeModal }
                center
                animationDuration={250}
                modalId='delete-subject-type-modal'
            >
                <form
                    onSubmit={ e => this.deleteSubjectTypesHandler(e) }
                    className='admin-delete'
                >
                    <p className='admin-delete__text'>
                        Вы уверенны что хотите удалить тип занятий
                        <span>{this.state.subjectTypeData.name}?</span>
                        <span className="admin-delete__warning">Внимание! Данное действие приведёт к удалению всех связанных данных с выбранной записью.</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteSubjectTypeModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    render() {
        if (this.props.subjectsLoading && this.props.subjectTypesLoading) {
            return (<Loader/>)
        }
        return (
            <div className='AdminSubjects'>
                <div className="AdminSubjects__subjects-wrap">
                    <div className="AdminSubjects__filter">
                        <div className="AdminSubjects__search">
                            <FilterSearch
                                height={ 35 }
                                disableSelect
                                changeHandler={ this.subjectsFilterChangeHandler }
                                inputName='filterValue'
                            />
                        </div>
                        <div className="AdminSubjects__buttons">
                            <MainButton
                                className='AdminSubjects__filter-btn'
                                onClick={ () => this.subjectsFilterSubmit() }
                            >
                                Найти
                            </MainButton>
                            <MainButton
                                className='AdminSubjects__add-subject-btn'
                                onClick={ () => this.hideCreateSubjectModal() }
                            >
                                Создать дисциплину
                            </MainButton>
                        </div>
                    </div>
                    { this.renderSubjectsTable() }
                </div>
                <div className="AdminSubjects__subject-types-wrap">
                    <div className="AdminSubjects__filter">
                        <div className="AdminSubjects__search">
                            <FilterSearch
                                height={ 35 }
                                disableSelect
                                changeHandler={ this.subjectTypesFilterChangeHandler }
                                inputName='filterValue'
                            />
                        </div>
                        <div className="AdminSubjects__buttons">
                            <MainButton
                                className='AdminSubjects__filter-btn'
                                onClick={ () => this.subjectTypesFilterSubmit() }
                            >
                                Найти
                            </MainButton>
                            <MainButton
                                className='AdminSubjects__add-subject-btn'
                                onClick={ () => this.hideCreateSubjectTypeModal() }
                            >
                                Создать тип занятий
                            </MainButton>
                        </div>
                    </div>
                    { this.renderSubjectTypesTable() }
                </div>
                { this.renderCreateSubjectModal() }
                { this.renderUpdateSubjectModal() }
                { this.renderDeleteSubjectModal() }
                { this.renderCreateSubjectTypeModal() }
                { this.renderUpdateSubjectTypeModal() }
                { this.renderDeleteSubjectTypeModal() }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        subjects: state.entities.subjects,
        subjectTypes: state.entities.subjectTypes,
        subjectsLoading: state.entities.subjectsLoading,
        subjectTypesLoading: state.entities.subjectTypesLoading
    }
}

export default connect(mapStateToProps)(AdminSubjects)