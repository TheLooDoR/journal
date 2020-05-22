import React, {Component} from "react";
import { connect } from 'react-redux'
import isEmpty from "../../../common-js/isEmpty";
import Loader from "../../../components/UI/Loader/Loader";
import Statistic from "../../../components/Statistic/Statistic";
import {GET_STATISTIC_DATA, getRatingDataByFaculty, getStatisticDataByFaculty} from "../../../actions";
import './FacultyStatistics.scss'

class FacultyStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialPage: 0,
            pageSize: 10
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        const { initialPage, pageSize } = this.state
        dispatch(getStatisticDataByFaculty())
        dispatch(getRatingDataByFaculty(initialPage, pageSize))
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: GET_STATISTIC_DATA,
            payload: {}
        })
    }

    handlePageClick = data => {
        const { dispatch } = this.props
        dispatch(getRatingDataByFaculty(data.selected, this.state.pageSize))
    }

    render() {
        const { statistic, rating, statisticLoading, ratingLoading } = this.props
        return (
            <div className='FacultyStatistics'>
                <div className="container">
                    <div className="FacultyStatistics__title">Статистика факультета</div>
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
        statistic: state.statistic.statisticData,
        rating: state.statistic.ratingData,
        statisticLoading: state.statistic.statisticLoading,
        ratingLoading: state.statistic.ratingLoading
    }
}

export default connect(mapStateToProps)(FacultyStatistics)