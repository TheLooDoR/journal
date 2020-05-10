import {
    GET_SCHEDULE, GET_SCHEDULE_REQUEST, GET_SCHEDULE_REQUEST_FINISHED,
    GET_USER_SCHEDULE
} from "./types";
import Axios from "axios";

export const userScheduleData = scheduleData => {
    return {
        type: GET_USER_SCHEDULE,
        payload: scheduleData
    }
}

export const scheduleData = scheduleData => {
    return {
        type: GET_SCHEDULE,
        payload: scheduleData
    }
}

export const requestScheduleData = () => {
    return {
        type: GET_SCHEDULE_REQUEST,
        payload: true
    }
}

export const requestScheduleDataFinished = () => {
    return {
        type: GET_SCHEDULE_REQUEST_FINISHED,
        payload: false
    }
}

export const getUserScheduleData = user_id => dispatch => {
    Axios.get(`api/schedule/user-schedule/${user_id}`)
        .then(res => {
            dispatch(userScheduleData(res.data))
        })
}

export const getScheduleData = (filterType, filterValue) => dispatch => {
    dispatch(requestScheduleData())
    Axios.get('api/schedule/', { params: {filterType, filterValue} })
        .then(res => {
            dispatch(scheduleData(res.data.schedule))
            dispatch(requestScheduleDataFinished())
        })
}