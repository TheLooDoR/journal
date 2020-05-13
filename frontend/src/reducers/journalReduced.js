import {
    SET_JOURNAL_PARAMETERS,
    SET_JOURNAL_DATA,
    REQUEST_JOURNAL_DATA,
    REQUEST_JOURNAL_DATA_FINISHED, SET_JOURNAL_DATE, SET_JOURNAL_STUDENTS, SET_JOURNAL_USER
} from "../actions";

const initialState = {
    journalParameters: {
        currentGroup: {},
        currentSubject: {},
        currentSubjectType: {}
    },
    journalData: {},
    journalDate: {},
    journalStudents: {},
    journalUser: {},
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_JOURNAL_PARAMETERS:
            return {
                ...state,
                journalParameters: action.payload
            }
        case SET_JOURNAL_DATA:
            return {
                ...state,
                journalData: action.payload
            }
        case SET_JOURNAL_DATE:
            return {
                ...state,
                journalDate: action.payload
            }
        case SET_JOURNAL_STUDENTS:
            return {
                ...state,
                journalStudents: action.payload
            }
        case SET_JOURNAL_USER:
            return {
                ...state,
                journalUser: action.payload
            }
        case REQUEST_JOURNAL_DATA:
            return {
                ...state,
                isLoading: action.payload
            }
        case REQUEST_JOURNAL_DATA_FINISHED:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}