import {SET_JOURNAL_DATA} from "../actions";

const initialState = {
    journalData: {
        currentGroup: '',
        currentSubject: '',
        currentSubjectType: ''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_JOURNAL_DATA:
            return {
                ...state,
                journalData: action.payload
            }
        default:
            return state
    }
}