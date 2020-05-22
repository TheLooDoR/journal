import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    GET_STATISTIC_DATA,
    getDepartmentsData,
    getGroupsDataByDepartment, getRatingDataByGroup,
    getStatisticDataByGroup
} from "../../../actions";
import CustomSelect from "../../../components/UI/Select/CustomSelect";
import './GroupStatistics.scss'
import isEmpty from "../../../common-js/isEmpty";
import MainButton from "../../../components/UI/MainButton/MainButton";
import Statistic from "../../../components/Statistic/Statistic";
import Loader from "../../../components/UI/Loader/Loader";

class GroupStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            department: {},
            group: {},
            initialPage: 0,
            pageSize: 8
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
            type: GET_STATISTIC_DATA,
            payload: {}
        })
    }

    departmentChangeHandler(department) {
        this.setState({
            department
        })
    }

    groupChangeHandler(group) {
        this.setState({
            group
        })
    }

    showStatistics = () => {
        const { dispatch } = this.props
        const { initialPage, pageSize, group } = this.state
        dispatch(getStatisticDataByGroup(this.state.group.id))
        dispatch(getRatingDataByGroup(initialPage, pageSize, group.id))
    }

    handlePageClick = data => {
        const { dispatch } = this.props
        dispatch(getRatingDataByGroup(data.selected, this.state.pageSize, this.state.group.id))
    };

    render() {
        const { departments, groups, groupsLoading, statistic, rating, statisticLoading, ratingLoading } = this.props
        const { group, department } = this.state
        return (
            <div className='GroupStatistics'>
                <div className="container">
                    <div className="GroupStatistics__title">Статистика по группам</div>
                    <div className="GroupStatistics__selects">
                        <CustomSelect
                            className='GroupStatistics__select GroupStatistics__department-select'
                            label={el => `${el.name}`}
                            value={el => el}
                            options={departments}
                            isSearchable
                            changeHandler={(value) => this.departmentChangeHandler(value)}
                            placeholder='Кафедра'
                        />
                        <CustomSelect
                            className='GroupStatistics__select GroupStatistics__group-select'
                            label={el => `${el.name}`}
                            value={el => el}
                            options={groups}
                            isSearchable
                            changeHandler={(value) => this.groupChangeHandler(value)}
                            placeholder='Группа'
                            isLoading={groupsLoading}
                            disabled={groupsLoading }
                        />
                        <MainButton
                            className='GroupStatistics__btn'
                            disabled={isEmpty(group) || isEmpty(department)}
                            onClick={this.showStatistics}
                        >
                            Показать
                        </MainButton>
                    </div>
                    {isEmpty(statistic) || isEmpty(rating) ? statisticLoading || ratingLoading ? <Loader/> : null :
                        <Statistic
                            statistic={statistic}
                            ratingElements={rating.ratingElements}
                            ratingCount={rating.elementsCount.ratingCount}
                            currentPage={rating.currentPage}
                            handlePageClick={this.handlePageClick}
                            pageSize={this.state.pageSize}
                            statisticLoading={statisticLoading}
                            ratingLoading={ratingLoading}
                        />
                    }
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
        statistic: state.statistic.statisticData,
        rating: state.statistic.ratingData,
        statisticLoading: state.statistic.statisticLoading,
        ratingLoading: state.statistic.ratingLoading
    }
}

export default connect(mapStateToProps)(GroupStatistics)