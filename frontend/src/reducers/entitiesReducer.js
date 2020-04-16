import {GET_CORPS, GET_DEPARTMENTS, GET_GROUPS, GET_SUBJECT_TYPES, GET_SUBJECTS, GET_TIME} from "../actions";

const initialState =  {
    departments: [],
    groups: [],
    subjectTypes: [],
    subjects: [],
    time: [],
    corps: []
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
        default:
            return state
    }
}