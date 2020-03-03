import React, { Component } from 'react';
import './Home.scss'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {
    getGroupsData,
    getSubjectsData,
    getSubjectTypesData,
    setCurrentGroup,
    setCurrentSubject,
    setCurrentSubjectType, setJournalData
} from "../../actions";
import MainButton from '../../components/UI/MainButton/MainButton'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            journalData: {
                group: '1',
                subjectType: '1',
                subject: '1'
            }
        }
    }


    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getGroupsData())
        dispatch(getSubjectTypesData())
        dispatch(getSubjectsData())
    }

    changeHandler (e) {
        let journalData = this.state.journalData
        journalData[e.target.name] = e.target.value
        this.setState({
            journalData
        })
        // this.setState({
        //    [e.target.name]: e.target.value
        // })
    }

    clickHandler = () => {
        const { dispatch } = this.props
        dispatch(setJournalData(this.state.journalData))
    }

    render() {
        const {entities} = this.props
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
                            value={this.state.journalData.group}
                            onChange={(e) => this.changeHandler(e)}
                        >
                            {entities.groups.map((el) => {
                                return (
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="Home__subject-types filter-select__wrap">
                        <select
                            className='filter-select'
                            name='subjectType'
                            value={this.state.journalData.subjectType}
                            onChange={(e) => this.changeHandler(e)}
                        >
                            {entities.subjectTypes.map((el) => {
                                return (
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="Home__subjects filter-select__wrap">
                        <select
                            className='filter-select'
                            name='subject'
                            value={this.state.journalData.subject}
                            onChange={(e) => this.changeHandler(e)}
                        >
                            {entities.subjects.map((el) => {
                                return (
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <MainButton
                        className='Home__btn'
                        onClick={this.clickHandler}
                    >
                        Найти
                    </MainButton>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities: state.entities
    }
}

export default connect(mapStateToProps)(Home)