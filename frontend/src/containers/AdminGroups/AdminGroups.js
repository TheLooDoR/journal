import React, { Component } from "react";
import { connect } from 'react-redux'
import FilterSearch from "../../components/UI/FilterSearch/FilterSearch";
import MainButton from "../../components/UI/MainButton/MainButton";

import editLogo from '../../assets/admin/edit.png'
import deleteLogo from '../../assets/admin/delete.png'
import './AdminGroups.scss'
import {getGroupsData} from "../../actions";
import Loader from "../../components/UI/Loader/Loader";
class AdminGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getGroupsData())
    }

    renderGroupsTable() {
        const { groups } = this.props
        if (!groups) {
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
                                        <tr key={el.id}>
                                            <td className='admin-table__number'>{ index + 1 }</td>
                                            <td>{ el.name }</td>
                                            <td>{ el.departments[0].name }</td>
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

    renderUsersTable() {
        return (
            <div className="admin-table__wrap AdminGroups__users-table">
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
                    {this.renderUsersTable()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        groups: state.entities.groups
    }
}

export default connect(mapStateToProps)(AdminGroups)