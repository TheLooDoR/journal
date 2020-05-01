import {
    GET_CORPS,
    GET_DEPARTMENTS,
    GET_GROUPS,
    GET_POSITIONS,
    GET_ROLES, GET_STUDENTS,
    GET_SUBJECT_TYPES,
    GET_SUBJECTS,
    GET_TIME, REQUEST_GROUPS, REQUEST_GROUPS_FINISHED, REQUEST_STUDENTS, REQUEST_STUDENTS_FINISHED
} from "../actions";

const initialState =  {
    departments: [],
    groups: [],
    subjectTypes: [],
    subjects: [],
    time: [],
    corps: [],
    roles: [],
    positions: [],
    students: [],
    groupsLoading: false,
    studentsLoading: false
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
        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload
            }
        case REQUEST_GROUPS:
            return {
                ...state,
                groupsLoading: action.payload
            }
        case REQUEST_GROUPS_FINISHED:
            return {
                ...state,
                groupsLoading: action.payload
            }
        case REQUEST_STUDENTS:
            return {
                ...state,
                studentsLoading: action.payload
            }
        case REQUEST_STUDENTS_FINISHED: {
            return {
                ...state,
                studentsLoading: action.payload
            }
        }
        default:
            return state
    }
}