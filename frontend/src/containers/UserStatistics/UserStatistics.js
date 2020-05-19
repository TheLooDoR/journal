import React, {Component} from "react";
import { connect } from 'react-redux'
import CustomSelect from "../../components/UI/Select/CustomSelect";
import {
    GET_STATISTIC_DATA,
    getRatingDataByUser,
    getSelectUsersData,
    getStatisticDataByUser
} from "../../actions";
import isEmpty from "../../common-js/isEmpty";
import MainButton from "../../components/UI/MainButton/MainButton";
import Loader from "../../components/UI/Loader/Loader";
import Statistic from "../../components/Statistic/Statistic";
import './UserStatistics.scss'

class UserStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            initialPage: 0,
            pageSize: 8
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getSelectUsersData())
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: GET_STATISTIC_DATA,
            payload: {}
        })
    }

    userChangeHandler(value) {
        this.setState({
            user: value
        })
    }

    showStatistics = () => {
        const { dispatch } = this.props
        const { initialPage, pageSize, user } = this.state
        dispatch(getStatisticDataByUser(this.state.user.id))
        dispatch(getRatingDataByUser(initialPage, pageSize, user.id))
    }

    handlePageClick = data => {
        const { dispatch } = this.props
        dispatch(getRatingDataByUser(data.selected, this.state.pageSize, this.state.user.id))
    }

    render() {
        const { users, statistic, rating, statisticLoading, ratingLoading } = this.props
        const { user } = this.state
        return (
            <div className='UserStatistics'>
                <div className="container">
                    <div className="UserStatistics__title">Статистика по преподавателям</div>
                    <div className="UserStatistics__selects">
                        <CustomSelect
                            className='UserStatistics__select'
                            label={el => `${el.surname} ${el.name} ${el.patronymic}`}
                            value={el => el}
                            options={users}
                            isSearchable
                            changeHandler={(value) => this.userChangeHandler(value)}
                            placeholder='Преподаватель'
                        />
                        <MainButton
                            className='GroupStatistics__btn'
                            disabled={isEmpty(user)}
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
        users: state.users.users,
        statistic: state.statistic.statisticData,
        rating: state.statistic.ratingData,
        statisticLoading: state.statistic.statisticLoading,
        ratingLoading: state.statistic.ratingLoading
    }
}

export default connect(mapStateToProps)(UserStatistics)