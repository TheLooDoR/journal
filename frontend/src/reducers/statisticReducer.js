import {
    GET_RATING_DATA, GET_RATING_DATA_REQUEST, GET_RATING_DATA_REQUEST_FINISHED,
    GET_STATISTIC_DATA,
    GET_STATISTIC_DATA_REQUEST,
    GET_STATISTIC_DATA_REQUEST_FINISHED
} from "../actions";


const initialState = {
    statisticData: {},
    ratingData: {},
    statisticLoading: false,
    ratingLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STATISTIC_DATA:
            return {
                ...state,
                statisticData: action.payload
            }
        case GET_RATING_DATA:
            return {
                ...state,
                ratingData: action.payload
            }
        case GET_STATISTIC_DATA_REQUEST:
            return {
                ...state,
                statisticLoading: action.payload
            }
        case GET_STATISTIC_DATA_REQUEST_FINISHED:
            return {
                ...state,
                statisticLoading: action.payload
            }
        case GET_RATING_DATA_REQUEST:
            return {
                ...state,
                ratingLoading: action.payload
            }
        case GET_RATING_DATA_REQUEST_FINISHED:
            return {
                ...state,
                ratingLoading: action.payload
            }
        default:
            return state;
    }
}
