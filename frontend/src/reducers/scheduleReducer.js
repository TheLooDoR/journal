import {
    GET_SCHEDULE, GET_SCHEDULE_REQUEST, GET_SCHEDULE_REQUEST_FINISHED,
    GET_USER_SCHEDULE
} from "../actions";

const initialState = {
    todaySchedule: [],
    tomorrowSchedule: [],
    schedule: [],
    scheduleLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SCHEDULE:
            return {
                ...state,
                todaySchedule: action.payload.todaySchedule,
                tomorrowSchedule: action.payload.tomorrowSchedule
            }
        case GET_SCHEDULE:
            return {
                ...state,
                schedule: action.payload
            }
        case GET_SCHEDULE_REQUEST:
            return {
                ...state,
                scheduleLoading: action.payload
            }
        case GET_SCHEDULE_REQUEST_FINISHED:
            return {
                ...state,
                scheduleLoading: action.payload
            }
        default:
            return state
    }
}