import {
    SET_JOURNAL_PARAMETERS,
    SET_JOURNAL_DATA,
    GET_ERRORS,
    REQUEST_JOURNAL_DATA,
    REQUEST_JOURNAL_DATA_FINISHED,
    SET_JOURNAL_DATE,
    SET_JOURNAL_STUDENTS,
    SET_JOURNAL_USER,
    SET_LATEST_JOURNALS,
    SET_JOURNALS_BY_FILTER,
    REQUEST_JOURNAL_LIST,
    REQUEST_JOURNAL_LIST_FINISHED
} from "./types";
import Axios from "axios";
import { store } from 'react-notifications-component';

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

const journalUser = journalUser => {
    return {
        type: SET_JOURNAL_USER,
        payload: journalUser
    }
}

const latestJournal = latestJournal => {
    return {
        type: SET_LATEST_JOURNALS,
        payload: latestJournal
    }
}

const journalsByFilter = journalsByFilter => {
    return {
        type: SET_JOURNALS_BY_FILTER,
        payload: journalsByFilter
    }
}

export const requestJournalData = () => {
    return {
        type: REQUEST_JOURNAL_DATA,
        payload: true
    }
}

export const requestJournalDataFinished = () => {
    return {
        type: REQUEST_JOURNAL_DATA_FINISHED,
        payload: false
    }
}

export const requestJournalList = () => {
    return {
        type: REQUEST_JOURNAL_LIST,
        payload: true
    }
}

export const requestJournalListFinished = () => {
    return {
        type: REQUEST_JOURNAL_LIST_FINISHED,
        payload: false
    }
}

export const setJournalData = (journalParameters) => dispatch => {
    const group_id = journalParameters.group_id
    const user_id = journalParameters.user_id
    const subject_id = journalParameters.subject_id
    const type_id = journalParameters.type_id
    const isAdmin = journalParameters.isAdmin
    dispatch(requestJournalData())
    Axios.post('api/journal', { group_id, user_id, subject_id, type_id, isAdmin })
        .then(res => {
            dispatch(journalData(res.data.journal))
            dispatch(journalDate(res.data.dates))
            dispatch(journalStudents(res.data.students))
            dispatch(journalUser(res.data.user.name))
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


export const addTaskByDate = taskData => dispatch => {
    const {user_id, subject_id, type_id, group_id, time_id} = taskData
    const journalParameters = {
        user_id,
        subject_id,
        type_id,
        group_id,
        time_id
    }
    dispatch(requestJournalData())
    Axios.post('api/journal/create-task-by-date', taskData)
        .then(() => dispatch(setJournalData(journalParameters)))
        .catch(err => {
            dispatch(requestJournalDataFinished())
            store.addNotification({
                title: 'Ошибка',
                message: err.response.data,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 10000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
        })
}

export const setLatestJournal = () => dispatch => {
    dispatch(requestJournalData())
    Axios.get('api/journal/latest')
        .then( res => {
            dispatch(latestJournal(res.data))
            dispatch(requestJournalDataFinished())
        })
        .catch( err => {
            dispatch(requestJournalDataFinished())
            console.log(err.response.data)
        })
}

export const setJournalsByType = journalParameters => dispatch => {
    dispatch(requestJournalList())
    Axios.post('api/journal/by-subject-type', journalParameters)
        .then( res => {
            dispatch(journalsByFilter(res.data))
            dispatch(requestJournalListFinished())
        })
        .catch( err => {
            dispatch(requestJournalListFinished())
            console.log(err.response.data)
        })
}

export const setJournalsBySubject = journalParameters => dispatch => {
    dispatch(requestJournalList())
    Axios.post('api/journal/by-subject', journalParameters)
        .then( res => {
            dispatch(journalsByFilter(res.data))
            dispatch(requestJournalListFinished())
        })
        .catch( err => {
            dispatch(requestJournalListFinished())
            console.log(err.response.data)
        })
}

export const setJournalsByGroup = journalParameters => dispatch => {
    dispatch(requestJournalList())
    Axios.post('api/journal/by-group', journalParameters)
        .then( res => {
            dispatch(journalsByFilter(res.data))
            dispatch(requestJournalListFinished())
        })
        .catch( err => {
            dispatch(requestJournalListFinished())
            console.log(err.response.data)
        })
}