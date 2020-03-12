import {
    SET_JOURNAL_PARAMETERS,
    SET_JOURNAL_DATA,
    GET_ERRORS, REQUEST_JOURNAL_DATA, REQUEST_JOURNAL_DATA_FINISHED, SET_JOURNAL_DATE, SET_JOURNAL_STUDENTS,
} from "./types";
import Axios from "axios";

export const setJournalParameters = journalParameters => {
    return {
        type: SET_JOURNAL_PARAMETERS,
        payload: journalParameters
    }
}

const journalData = journalData => {
    return {
        type: SET_JOURNAL_DATA,
        payload: journalData
    }
}

const journalDate = journalDate => {
    return {
        type: SET_JOURNAL_DATE,
        payload: journalDate
    }
}

const journalStudents = journalStudents => {
    return {
        type: SET_JOURNAL_STUDENTS,
        payload: journalStudents
    }
}

const requestJournalData = () => {
    return {
        type: REQUEST_JOURNAL_DATA,
        payload: true
    }
}

const requestJournalDataFinished = () => {
    return {
        type: REQUEST_JOURNAL_DATA_FINISHED,
        payload: false
    }
}

export const setJournalData = (journalParameters, userId) => dispatch => {
    const group_id = journalParameters.group.id
    const user_id = userId
    const subject_id = journalParameters.subject.id
    const type_id = journalParameters.subjectType.id
    dispatch(requestJournalData())
    Axios.post('api/journal', { group_id, user_id, subject_id, type_id })
        .then(res => {
            dispatch(journalData(res.data.journal))
            dispatch(journalDate(res.data.dates))
            dispatch(journalStudents(res.data.students))
            dispatch(requestJournalDataFinished())
        })
        .catch(err => {
            dispatch(requestJournalData())
            dispatch(journalData({}))
            dispatch(requestJournalDataFinished())
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}