import {
    GET_USER_SCHEDULE
} from "./types";
import Axios from "axios";

export const scheduleData = scheduleData => {
    return {
        type: GET_USER_SCHEDULE,
        payload: scheduleData
    }
}

export const getUserScheduleData = user_id => dispatch => {
    Axios.get(`api/schedule/user-schedule/${user_id}`)
        .then(res => {
            dispatch(scheduleData(res.data))
        })
}