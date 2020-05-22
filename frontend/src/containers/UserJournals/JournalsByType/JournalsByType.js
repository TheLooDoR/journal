import React, {Component} from "react";
import { connect } from 'react-redux'
import CustomSelect from "../../../components/UI/Select/CustomSelect";
import MainButton from "../../../components/UI/MainButton/MainButton";
import isEmpty from "../../../common-js/isEmpty";
import {
    getSubjectTypesData,
    SET_JOURNALS_BY_FILTER,
    setJournalData,
    setJournalParameters,
    setJournalsByType
} from "../../../actions";
import './JournalsByType.scss'
import Loader from "../../../components/UI/Loader/Loader";
import Journal from "../../../components/Journal/Journal";

class JournalsByType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjectType: {},
            showModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getSubjectTypesData())
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: SET_JOURNALS_BY_FILTER,
            payload: []
        })
    }

    subjectTypeChangeHandler(value) {
        this.setState({
            subjectType: value
        })
    }

    getJournalsClickHandler = () => {
        const { dispatch, user } = this.props
        const { subjectType } = this.state
        const isAdmin = user.role === 'admin'
        const journalParameters = {
            user_id: user.userId,
            type_id: subjectType.id,
            isAdmin
        }
        dispatch(setJournalsByType(journalParameters))
    }

    openJournalHandler(params) {
        const { dispatch } = this.props
        const { user } = this.props
        dispatch(setJournalParameters({
            group: {
                id: params.group_id,
                name: params.group
            },
            department: {
                name: params.department
            },
            subject: {
                id: params.subject_id,
                name: params.subject
            },
            subjectType: {
                id: params.type_id,
                name: params.subject_type
            }
        }))
        const isAdmin = user.role === 'admin'
        const journalParameters = {
            group_id: params.group_id,
            subject_id: params.subject_id,
            type_id: params.type_id,
            user_id: user.userId,
            isAdmin
        }
        dispatch(setJournalData(journalParameters))
        this.setShowModal()
    }

    setShowModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    renderModal() {
        const { group, subjectType, subject } = this.props.journalParameters
        return (
            <Journal
                show={this.state.showModal}
                onHide={() => this.setShowModal()}
                group={group}
                subjectType={subjectType}
                subject={subject}
                journalData={this.props.journalData}
                journalDate={this.props.journalDate}
                journalStudents={this.props.journalStudents}
                journalUser={this.props.journalUser}
                errors={this.props.errors}
                isLoading={this.props.journalLoading}
            />
        )
    }

    render() {
        const { subjectTypes, journalsByFilter, journalListLoading, user } = this.props
        return (
            <div className='JournalsByType'>
                <div className="container">
                    <div className="JournalsByType__inputs">
                        <CustomSelect
                            className='JournalsByType__select'
                            label={el => el.name}
                            value={el => el}
                            options={subjectTypes}
                            isSearchable
                            changeHandler={(value) => this.subjectTypeChangeHandler(value)}
                            placeholder='Тип занятия'
                        />
                        <MainButton
                            className='JournalsByType__btn'
                            disabled={isEmpty(this.state.subjectType)}
                            onClick={this.getJournalsClickHandler}
                        >
                            Показать
                        </MainButton>
                    </div>
                    { journalsByFilter.length === 0 && journalListLoading && <Loader/>}
                    { journalsByFilter.length !== 0 &&
                        <div className='JournalsByType__table admin-table__wrap'>
                            <div className="admin-table">
                                <div className="admin-table__head">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                            <th className='admin-table__department-cell'>Кафедра</th>
                                            <th>Группа</th>
                                            <th>Дисциплина</th>
                                            { user.role === 'admin' && <th>Преподаватель</th>}
                                            <th className='admin-table__open-btn'/>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                                {journalListLoading ? <Loader/> :
                                    <>
                                        <div className="admin-table__body" ref={this.tableRef} onScroll={this.scrollHandler}>
                                            <table>
                                                <tbody>
                                                { journalsByFilter.map((el, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className='admin-table__number'>{ index + 1 }</td>
                                                            <td>{ el.department }</td>
                                                            <td>{ el.group }</td>
                                                            <td>{ el.subject }</td>
                                                            { user.role === 'admin' && <td>{ el.user }</td>}
                                                            <td className='admin-table__open-btn'>
                                                                <MainButton
                                                                    onClick={ () => this.openJournalHandler(el) }
                                                                >
                                                                    Открыть
                                                                </MainButton>
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
                                                    { user.role === 'admin' && <td/>}
                                                    <td className='admin-table__open-btn'/>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    }
                    {this.renderModal()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        subjectTypes: state.entities.subjectTypes,
        user: state.auth.user,
        journalsByFilter: state.journal.journalsByFilter,
        journalLoading: state.journal.isLoading,
        journalListLoading: state.journal.listLoading,
        journalParameters: state.journal.journalParameters,
        journalData: state.journal.journalData,
        journalDate: state.journal.journalDate,
        journalStudents: state.journal.journalStudents,
        journalUser: state.journal.journalUser,
    }
}

export default connect(mapStateToProps)(JournalsByType)