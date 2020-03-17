import React, { Component } from 'react';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {
    getGroupsData,
    getSubjectsData,
    getSubjectTypesData, setJournalData,
    setJournalParameters
} from "../../actions";
import MainButton from '../../components/UI/MainButton/MainButton'
import Journal from "../../components/Journal/Journal";
import './Home.scss'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            journalData: {
                group: {},
                subjectType: {},
                subject: {}
            },
            showModal: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getGroupsData())
        dispatch(getSubjectTypesData())
        dispatch(getSubjectsData())
    }

    changeHandler (e) {
        if (e.target.value !== 'DEFAULT') {
            let journalData = this.state.journalData
            journalData[e.target.name] = JSON.parse(e.target.value)
            this.setState({
                journalData
            })
        }
    }

    clickHandler = () => {
        const { dispatch } = this.props
        const { user } = this.props
        const {journalData} = this.state
        dispatch(setJournalParameters(this.state.journalData))
        const journalParameters = {
            group_id: journalData.group.id,
            subject_id: journalData.subject.id,
            type_id: journalData.subjectType.id,
            user_id: user.userId
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
                errors={this.props.errors}
                isLoading={this.props.isLoading}
            />
        )
    }

    render() {
        const {entities} = this.props
        const {journalData} = this.state
        if (!entities.subjectTypes || !entities.groups || !entities.subjects) {
            return (<Loader/>)
        }
        return (
            <div className='Home'>
                <div className="Home__categories">
                    <div className="Home__groups filter-select__wrap">
                        <select
                            className='filter-select'
                            name="group"
                            onChange={(e) => this.changeHandler(e)}
                            defaultValue={'DEFAULT'}
                        >
                            <option disabled value='DEFAULT'>Группа</option>
                            {entities.groups.map((el) => {
                                return (
                                    <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="Home__subject-types filter-select__wrap">
                        <select
                            className='filter-select'
                            name='subjectType'
                            onChange={(e) => this.changeHandler(e)}
                            defaultValue={'DEFAULT'}
                        >
                            <option disabled value='DEFAULT'>Дисциалина</option>
                            {entities.subjectTypes.map((el) => {
                                return (
                                    <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="Home__subjects filter-select__wrap">
                        <select
                            className='filter-select'
                            name='subject'
                            onChange={(e) => this.changeHandler(e)}
                            defaultValue={'DEFAULT'}
                        >
                            <option disabled value='DEFAULT'>Вид занятия</option>
                            {entities.subjects.map((el) => {
                                return (
                                    <option key={el.id} value={JSON.stringify(el)}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <MainButton
                        className='Home__btn'
                        onClick={this.clickHandler}
                        disabled={Object.entries(journalData.group).length === 0 || Object.entries(journalData.subjectType).length === 0 || Object.entries(journalData.subject).length === 0}
                    >
                        Найти
                    </MainButton>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities: state.entities,
        journalParameters: state.journal.journalParameters,
        journalData: state.journal.journalData,
        journalDate: state.journal.journalDate,
        journalStudents: state.journal.journalStudents,
        user: state.auth.user,
        errors: state.errors,
        isLoading: state.journal.isLoading
    }
}

export default connect(mapStateToProps)(Home)