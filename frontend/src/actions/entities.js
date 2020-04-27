import axios from "axios";
import {
    GET_CORPS,
    GET_DEPARTMENTS,
    GET_GROUPS,
    GET_POSITIONS,
    GET_ROLES,
    GET_SUBJECT_TYPES,
    GET_SUBJECTS,
    GET_TIME
} from "./types";

const departmentsData = departmentsData => {
    return {
        type: GET_DEPARTMENTS,
        payload: departmentsData
    }
}

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

const timeData = timeData => {
    return {
        type: GET_TIME,
        payload: timeData
    }
}

const corpsData = corpsData => {
    return {
        type: GET_CORPS,
        payload: corpsData
    }
}

const rolesData = rolesData => {
    return {
        type: GET_ROLES,
        payload: rolesData
    }
}

const positionsData = positionsData => {
    return {
        type: GET_POSITIONS,
        payload: positionsData
    }
}

export const getDepartmentsData = () => dispatch => {
    axios.get('api/departments/')
        .then(res => {
            dispatch(departmentsData(res.data.departments))
        })
}

export const getGroupsData = () => dispatch => {
    axios.get('api/groups/')
        .then((res) => {
            dispatch(groupsData(res.data.groups))
        })
}

export const getGroupsDataByDepartment = (department_id) => dispatch => {
    axios.get(`api/groups/${department_id}`)
        .then(res => {
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

export const getTimeData = () => dispatch => {
    axios.get('api/time/')
        .then(res => dispatch(timeData(res.data.time)))
}

export const getCorpsData = () => dispatch => {
    axios.get('api/corps/')
        .then(res => dispatch(corpsData(res.data.corps)))
}

export const getRolesData = () => dispatch => {
    axios.get('api/roles/')
        .then(res => dispatch(rolesData(res.data.roles)))
}

export const getPositionsData = () => dispatch => {
    axios.get('api/positions/')
        .then(res => dispatch(positionsData(res.data.positions)))
}

