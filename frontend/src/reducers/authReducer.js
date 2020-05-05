import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SET_CURRENT_USER
} from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    isLoggingIn: false,
    isSigningUp: false
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                isSigningUp: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isSigningUp: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isSigningUp: false
            }
        default:
            return state;
    }
}