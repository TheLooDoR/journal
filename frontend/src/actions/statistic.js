import Axios from "axios";
import {
    GET_RATING_DATA, GET_RATING_DATA_REQUEST, GET_RATING_DATA_REQUEST_FINISHED,
    GET_STATISTIC_DATA,
    GET_STATISTIC_DATA_REQUEST,
    GET_STATISTIC_DATA_REQUEST_FINISHED
} from "./types";

const statisticData = statisticData => {
    return {
        type: GET_STATISTIC_DATA,
        payload: statisticData
    }
}

const ratingData = (ratingData, page) => {
    return {
        type: GET_RATING_DATA,
        payload: {
            ...ratingData,
            currentPage: page
        }
    }
}

const requestStatistic = () => {
    return {
        type: GET_STATISTIC_DATA_REQUEST,
        payload: true
    }
}

const requestStatisticFinished = () => {
    return {
        type: GET_STATISTIC_DATA_REQUEST_FINISHED,
        payload: false
    }
}

const requestRating = () => {
    return {
        type: GET_RATING_DATA_REQUEST,
        payload: true
    }
}

const requestRatingFinished = () => {
    return {
        type: GET_RATING_DATA_REQUEST_FINISHED,
        payload: false
    }
}

export const getStatisticDataByGroup = (group_id) => dispatch => {
    dispatch(requestStatistic())
    Axios.get(`api/statistics/group/${group_id}`)
        .then(res => {
            dispatch(statisticData(res.data))
            dispatch(requestStatisticFinished())
        })
        .catch(err => {
            dispatch(requestStatisticFinished())
            console.log(err.response.data)
        })
}

export const getRatingDataBuGroup = (page, pageSize, group_id) => dispatch => {
    dispatch(requestRating())
    Axios.get('api/statistics/rating-by-group/', { params: { page, pageSize, group_id}})
        .then(res => {
            dispatch(ratingData(res.data, page))
            dispatch(requestRatingFinished())
        })
        .catch(err => {
            dispatch(requestRatingFinished())
            console.log(err.response.data)
        })
}