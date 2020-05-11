import {
    GET_CORPS,
    GET_DEPARTMENTS,
    GET_GROUPS,
    GET_POSITIONS,
    GET_ROLES,
    GET_STUDENTS,
    GET_SUBJECT_TYPES,
    GET_SUBJECTS,
    GET_TIME, GET_WEEK_DAYS, REQUEST_CORPS, REQUEST_CORPS_FINISHED, REQUEST_DEPARTMENTS, REQUEST_DEPARTMENTS_FINISHED,
    REQUEST_GROUPS,
    REQUEST_GROUPS_FINISHED, REQUEST_POSITIONS, REQUEST_POSITIONS_FINISHED,
    REQUEST_STUDENTS,
    REQUEST_STUDENTS_FINISHED, REQUEST_SUBJECT_TYPES, REQUEST_SUBJECT_TYPES_FINISHED,
    REQUEST_SUBJECTS,
    REQUEST_SUBJECTS_FINISHED
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
    weekDays: [],
    groupsLoading: false,
    studentsLoading: false,
    subjectsLoading: false,
    subjectTypesLoading: false,
    corpsLoading: false,
    departmentsLoading: false,
    positionsLoading: false
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
        case GET_WEEK_DAYS:
            return {
                ...state,
                weekDays: action.payload
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
        case REQUEST_STUDENTS_FINISHED:
            return {
                ...state,
                studentsLoading: action.payload
            }
        case REQUEST_SUBJECTS:
            return {
                ...state,
                subjectsLoading: action.payload
            }
        case REQUEST_SUBJECTS_FINISHED:
            return {
                ...state,
                subjectsLoading: action.payload
            }
        case REQUEST_SUBJECT_TYPES:
            return {
                ...state,
                subjectTypesLoading: action.payload
            }
        case REQUEST_SUBJECT_TYPES_FINISHED:
            return {
                ...state,
                subjectTypesLoading: action.payload
            }
        case REQUEST_CORPS:
            return {
                ...state,
                corpsLoading: action.payload
            }
        case REQUEST_CORPS_FINISHED:
            return {
                ...state,
                corpsLoading: action.payload
            }
        case REQUEST_DEPARTMENTS:
            return {
                ...state,
                departmentsLoading: action.payload
            }
        case REQUEST_DEPARTMENTS_FINISHED:
            return {
                ...state,
                departmentsLoading: action.payload
            }
        case REQUEST_POSITIONS:
            return {
                ...state,
                positionsLoading: action.payload
            }
        case REQUEST_POSITIONS_FINISHED:
            return {
                ...state,
                positionsLoading: action.payload
            }
        default:
            return state
    }
}