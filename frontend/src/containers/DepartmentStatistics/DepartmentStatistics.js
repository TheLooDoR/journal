import React, {Component} from "react";
import { connect } from 'react-redux'
import CustomSelect from "../../components/UI/Select/CustomSelect";
import MainButton from "../../components/UI/MainButton/MainButton";
import isEmpty from "../../common-js/isEmpty";
import Loader from "../../components/UI/Loader/Loader";
import Statistic from "../../components/Statistic/Statistic";
import {
    GET_STATISTIC_DATA,
    getDepartmentsData, getRatingDataByDepartment,
    getStatisticDataByDepartment,
} from "../../actions";
import './DepartmentStatistics.scss'

class DepartmentStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            department: {},
            initialPage: 0,
            pageSize: 8
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDepartmentsData())
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: GET_STATISTIC_DATA,
            payload: {}
        })
    }

    departmentChangeHandler(value) {
        this.setState({
            department: value
        })
    }

    showStatistics = () => {
        const { dispatch } = this.props
        const { initialPage, pageSize, department } = this.state
        dispatch(getStatisticDataByDepartment(this.state.department.id))
        dispatch(getRatingDataByDepartment(initialPage, pageSize, department.id))
    }

    handlePageClick = data => {
        const { dispatch } = this.props
        dispatch(getRatingDataByDepartment(data.selected, this.state.pageSize, this.state.department.id))
    }

    render() {
        const { departments, statistic, rating, statisticLoading, ratingLoading } = this.props
        const { department } = this.state
        return (
            <div className='DepartmentStatistics'>
                <div className="container">
                    <div className="DepartmentStatistics__title">Статистика по кафедрам</div>
                    <div className="DepartmentStatistics__selects">
                        <CustomSelect
                            className='DepartmentStatistics__select'
                            label={el => el.name}
                            value={el => el}
                            options={departments}
                            isSearchable
                            changeHandler={(value) => this.departmentChangeHandler(value)}
                            placeholder='Кафедра'
                        />
                        <MainButton
                            className='DepartmentStatistics__btn'
                            disabled={isEmpty(department)}
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
        statistic: state.statistic.statisticData,
        rating: state.statistic.ratingData,
        statisticLoading: state.statistic.statisticLoading,
        ratingLoading: state.statistic.ratingLoading
    }
}

export default connect(mapStateToProps)(DepartmentStatistics)