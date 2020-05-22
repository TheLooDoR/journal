import React, {Component} from "react";
import { connect } from 'react-redux'
import CustomSelect from "../../../components/UI/Select/CustomSelect";
import MainButton from "../../../components/UI/MainButton/MainButton";
import isEmpty from "../../../common-js/isEmpty";
import {
    getDepartmentsData, getGroupsDataByDepartment,
    SET_JOURNALS_BY_FILTER,
    setJournalData,
    setJournalParameters, setJournalsByGroup,
} from "../../../actions";
import Loader from "../../../components/UI/Loader/Loader";
import Journal from "../../../components/Journal/Journal";
import './JournalsByGroup.scss'

class JournalsByGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            department: {},
            group: {},
            showModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDepartmentsData())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.department !== this.state.department) {
            this.props.dispatch(getGroupsDataByDepartment(this.state.department.id))
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: SET_JOURNALS_BY_FILTER,
            payload: []
        })
    }

    departmentChangeHandler(value) {
        this.setState({
            department: value
        })
    }

    groupChangeHandler(value) {
        this.setState({
            group: value
        })
    }

    getJournalsClickHandler = () => {
        const { dispatch, user } = this.props
        const { group } = this.state
        const isAdmin = user.role === 'admin'
        const journalParameters = {
            user_id: user.userId,
            group_id: group.id,
            isAdmin
        }
        dispatch(setJournalsByGroup(journalParameters))
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
        const { departments, groups, journalsByFilter, journalListLoading, groupsLoading, user } = this.props
        return (
            <div className='JournalsByGroup'>
                <div className="container">
                    <div className="JournalsByGroup__inputs">
                        <CustomSelect
                            className='JournalsByGroup__select JournalsByGroup__departments'
                            label={el => el.name}
                            value={el => el}
                            options={departments}
                            isSearchable
                            changeHandler={(value) => this.departmentChangeHandler(value)}
                            placeholder='Кафедра'
                        />
                        <CustomSelect
                            className='JournalsByGroup__select JournalsByGroup__groups'
                            label={el => el.name}
                            value={el => el}
                            options={groups}
                            isSearchable
                            changeHandler={(value) => this.groupChangeHandler(value)}
                            isLoading={groupsLoading}
                            disabled={groupsLoading}
                            placeholder='Группа'
                        />
                        <MainButton
                            className='JournalsByGroup__btn'
                            disabled={isEmpty(this.state.group)}
                            onClick={this.getJournalsClickHandler}
                        >
                            Показать
                        </MainButton>
                    </div>
                    { journalsByFilter.length === 0 && journalListLoading && <Loader/>}
                    { journalsByFilter.length !== 0 &&
                    <div className='JournalsByGroup__table admin-table__wrap'>
                        <div className="admin-table">
                            <div className="admin-table__head">
                                <table>
                                    <thead>
                                    <tr>
                                        <th style={{ fontSize: 24 }} className='admin-table__number'>№</th>
                                        <th>Дисциплина</th>
                                        {user.role === 'admin' && <th>Преподаватель</th>}
                                        <th width={100}>Вид занятия</th>
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
                                                        <td>{ el.subject }</td>
                                                        {user.role === 'admin' && <td>{ el.user }</td>}
                                                        <td width={100}>{ el.subject_type.substr(0, 1) }.</td>
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
                                                {user.role === 'admin' && <td/>}
                                                <td width={100}/>
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
        departments: state.entities.departments,
        groups: state.entities.groups,
        groupsLoading: state.entities.groupsLoading,
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

export default connect(mapStateToProps)(JournalsByGroup)