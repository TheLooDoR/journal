import {
    GET_CORPS,
    GET_DEPARTMENTS,
    GET_GROUPS,
    GET_POSITIONS,
    GET_ROLES,
    GET_SUBJECT_TYPES,
    GET_SUBJECTS,
    GET_TIME
} from "../actions";

const initialState =  {
    departments: [],
    groups: [],
    subjectTypes: [],
    subjects: [],
    time: [],
    corps: [],
    roles: [],
    positions: []
}

export default (state = initialState , action ) => {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        case GET_SUBJECT_TYPES:
            return {
                ...state,
                subjectTypes: action.payload
            }
        case GET_SUBJECTS:
            return {
                ...state,
                subjects: action.payload
            }
        case GET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            }
        case GET_TIME:
            return {
                ...state,
                time: action.payload
            }
        case GET_CORPS:
            return {
                ...state,
                corps: action.payload
            }
        case GET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        case GET_POSITIONS:
            return {
                ...state,
                positions: action.payload
            }
        default:
            return state
    }
}