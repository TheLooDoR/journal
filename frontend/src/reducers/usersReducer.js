import {GET_USERS, REQUEST_USERS_DATA, REQUEST_USERS_DATA_FINISHED} from "../actions";

const initialState = {
    users: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case (GET_USERS):
            return {
                ...state,
                users: action.payload
            }
        case (REQUEST_USERS_DATA):
            return {
                ...state,
                isLoading: action.payload
            }
        case (REQUEST_USERS_DATA_FINISHED):
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}