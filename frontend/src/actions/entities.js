import axios from "axios";
import {GET_GROUPS, GET_SUBJECT_TYPES, GET_SUBJECTS} from "./types";

const groupsData = groupsData => {
    return {
        type: GET_GROUPS,
        payload: groupsData
    }
}

const subjectTypesData = subjectTypesData => {
    return {
        type: GET_SUBJECT_TYPES,
        payload: subjectTypesData
    }
}

const subjectsData = subjectsData => {
    return {
        type: GET_SUBJECTS,
        payload: subjectsData
    }
}

export const getGroupsData = () => dispatch => {
    axios.get('api/groups/')
        .then((res) => {
            dispatch(groupsData(res.data.groups))
        })
}

export const getSubjectTypesData = () => dispatch => {
    axios.get('api/subject-types/')
        .then((res) => {
            dispatch(subjectTypesData(res.data.subjectTypes))
        })
}

export const getSubjectsData = () => dispatch => {
    axios.get('api/subjects/')
        .then(res => {
            dispatch(subjectsData(res.data.subjects))
        })
}

