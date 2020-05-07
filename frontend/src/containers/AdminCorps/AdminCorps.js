import React, { Component } from "react";
import { connect } from 'react-redux'
import Axios from "axios";
import Modal from 'react-responsive-modal';
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";
import MainButton from "../../components/UI/MainButton/MainButton";
import {getCorpsData} from "../../actions";
import Loader from "../../components/UI/Loader/Loader";
import editLogo from "../../assets/admin/edit.png";
import deleteLogo from "../../assets/admin/delete.png";
import './AdminCorps.scss'

class AdminCorps extends Component{

    constructor(props) {
        super(props);
        this.state = {
            corpData: {
                id: null,
                name: ''
            },
            corpsFilter: {
                filterValue: ''
            },
            corpLoading: false,
            showCreateCorpModal: false,
            showUpdateCorpModal: false,
            showDeleteCorpModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getCorpsData(this.state.corpsFilter.filterValue))
    }

    corpsFilterChangeHandler = e => {
        const { corpsFilter } = this.state
        this.setState({
            corpsFilter: {
                ...corpsFilter,
                [e.target.name]: e.target.value
            }
        })
    }

    corpsFilterSubmit() {
        const { dispatch } = this.props
        const { filterValue } = this.state.corpsFilter
        dispatch(getCorpsData(filterValue))
    }

    corpTextChangeHandler(e) {
        const { corpData } = this.state
        this.setState({
            corpData: {
                ...corpData,
                [e.target.name]: e.target.value
            }
        })
    }

    createCorpHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { name } = this.state.corpData
        const { filterValue } = this.state.corpsFilter
        const data = { name }
        Axios.post('api/corps', data)
            .then(() => {
                this.hideCreateCorpModal()
                dispatch(getCorpsData(filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    updateCorpHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id, name } = this.state.corpData
        const { filterValue } = this.state.corpsFilter
        const params = { id, name }
        Axios.patch('api/corps/', params)
            .then(() => {
                this.hideUpdateCorpModal()
                dispatch(getCorpsData(filterValue))
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    deleteCorpHandler(e) {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.state.corpData
        const { filterValue } = this.state.corpsFilter
        Axios.delete(`api/corps/${id}`)
            .then(() => {
                this.hideDeleteCorpModal()
                dispatch(getCorpsData(filterValue))
            })
            .catch(err => console.log(err.response.data))
    }

    hideCreateCorpModal() {
        const { corpData } = this.state
        this.setState({
            corpData: {
                ...corpData,
                id: null,
                name: ''
            },
            showCreateCorpModal: !this.state.showCreateCorpModal
        })
    }

    hideUpdateCorpModal(id=null) {
        if (!this.state.showUpdateCorpModal) {
            this.setState({
                corpLoading: true
            })
            Axios.get(`api/corps/${id}`)
                .then(res => {
                    const { corpData } = this.state
                    this.setState({
                        corpData: {
                            ...corpData,
                            id: res.data.id,
                            name: res.data.name
                        },
                        corpLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        this.setState({
            showUpdateCorpModal: !this.state.showUpdateCorpModal
        })
    }

    hideDeleteCorpModal(corp=null) {
        if (!this.state.showDeleteCorpModal) {
            const { corpData } = this.state
            this.setState({
                corpData: {
                    ...corpData,
                    ...corp
                }
            })
        }
        this.setState({
            showDeleteCorpModal: !this.state.showDeleteCorpModal
        })
    }

    renderCorpsTable() {
        const { corps, corpsLoading } = this.props
        if (corpsLoading) {
            return (<Loader/>)
        } else {
            if (corps.length === 0) {
                return (<p className='AdminCorps__not-found'>Корпуса не найдены</p>)
            }
            return (
                <div className='admin-table__wrap AdminCorps__corps-table'>
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
                        <div className="admin-table__body">
                            <table>
                                <tbody>
                                    { corps.map((el, index) => {
                                        return (
                                            <tr key={el.id}>
                                                <td className='admin-table__number'>{ index + 1 }</td>
                                                <td>{ el.name }</td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__edit-btn'
                                                        onClick={ () => this.hideUpdateCorpModal(el.id) }
                                                    >
                                                        <img src={editLogo} alt='Редактировать'/>
                                                    </button>
                                                </td>
                                                <td className='admin-table__btn-cell'>
                                                    <button
                                                        className='admin-table__delete-btn'
                                                        onClick={ () => this.hideDeleteCorpModal(el) }
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

    renderCreateCorpModal() {
        return (
            <Modal
                onClose={ () => this.hideCreateCorpModal() }
                open={this.state.showCreateCorpModal}
                center
                animationDuration={250}
            >
                <form onSubmit={ e => this.createCorpHandler(e) } className='admin-post'>
                    <h3 className='admin-post__title'>Создание корпуса</h3>
                    <div className="admin-post__inputs">
                        <div className="admin-post__input">
                            <p className="admin-post__label">Название</p>
                            <input
                                className='crud-input-text'
                                type="text"
                                name='name'
                                value={this.state.corpData.name}
                                onChange={ e => this.corpTextChangeHandler(e) }
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

    renderUpdateCorpModal() {
        const { corpLoading } = this.state
        return (
            <Modal
                onClose={ () => this.hideUpdateCorpModal() }
                open={this.state.showUpdateCorpModal}
                center
                animationDuration={250}
            >
                {corpLoading ? <Loader/> :
                    <form className='admin-post' onSubmit={ e => this.updateCorpHandler(e)}>
                        <h3 className="admin-post__title">Редактирование</h3>
                        <div className="admin-post__inputs">
                            <div className="admin-post__input">
                                <p className="admin-post__label">Название</p>
                                <input
                                    className='crud-input-text'
                                    type="text"
                                    name='name'
                                    value={this.state.corpData.name}
                                    onChange={ e => this.corpTextChangeHandler(e) }
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

    renderDeleteCorpModal() {
        return (
            <Modal
                onClose={ () => this.hideDeleteCorpModal() }
                open={this.state.showDeleteCorpModal}
                center
                animationDuration={250}
                modalId='delete-corp-modal'
            >
                <form className="admin-delete" onSubmit={ e => this.deleteCorpHandler(e) }>
                    <p className='admin-delete__text'>
                        Вы уверенны что хотите удалить корпус
                        <span>{this.state.corpData.name}</span>
                    </p>
                    <div className="admin-delete__buttons">
                        <button className="admin-delete__btn" onClick={(e) => {
                            e.preventDefault()
                            this.hideDeleteCorpModal()
                        }}>Нет</button>
                        <button className="admin-delete__btn" type='submit'>Да</button>
                    </div>
                </form>
            </Modal>
        )
    }

    render() {
        return (
            <div className='AdminCorps'>
                <div className="AdminCorps__corps-wrap">
                    <div className="AdminCorps__filter">
                        <div className="AdminCorps__search">
                            <FilterSearch
                                height={35}
                                disableSelect
                                changeHandler={this.corpsFilterChangeHandler}
                                inputName='filterValue'
                            />
                        </div>
                        <div className="AdminCorps__buttons">
                            <MainButton
                                className='AdminCorps__filter-btn'
                                onClick={ () => this.corpsFilterSubmit() }
                            >
                                Найти
                            </MainButton>
                            <MainButton
                                className='AdminCorps__add-corp-btn'
                                onClick={ () => this.hideCreateCorpModal() }
                            >
                                Создать корпус
                            </MainButton>
                        </div>
                    </div>
                    { this.renderCorpsTable() }
                </div>
                {this.renderCreateCorpModal()}
                {this.renderUpdateCorpModal()}
                {this.renderDeleteCorpModal()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        corps: state.entities.corps,
        corpsLoading: state.entities.corpsLoading
    }
}

export default connect(mapStateToProps)(AdminCorps)