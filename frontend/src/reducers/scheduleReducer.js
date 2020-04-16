import {
    GET_USER_SCHEDULE
} from "../actions";

const initialState = {
    todaySchedule: [],
    tomorrowSchedule: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SCHEDULE:
            return {
                ...state,
                todaySchedule: action.payload.todaySchedule,
                tomorrowSchedule: action.payload.tomorrowSchedule
            }
        default:
            return state
    }
}