import axios from "axios";
import {
    GET_CORPS,
    GET_DEPARTMENTS,
    GET_GROUPS,
    GET_POSITIONS,
    GET_ROLES, GET_STUDENTS,
    GET_SUBJECT_TYPES,
    GET_SUBJECTS,
    GET_TIME, REQUEST_GROUPS, REQUEST_GROUPS_FINISHED, REQUEST_STUDENTS, REQUEST_STUDENTS_FINISHED
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

const studentsData = studentsData => {
    return {
        type: GET_STUDENTS,
        payload: studentsData
    }
}

const requestGroups = () => {
    return {
        type: REQUEST_GROUPS,
        payload: true
    }
}

const requestGroupsFinished = () => {
    return {
        type: REQUEST_GROUPS_FINISHED,
        payload: false
    }
}

const requestStudents = () => {
    return {
        type: REQUEST_STUDENTS,
        payload: true
    }
}

const requestStudentsFinished = () => {
    return {
        type: REQUEST_STUDENTS_FINISHED,
        payload: false
    }
}

export const getDepartmentsData = () => dispatch => {
    axios.get('api/departments/')
        .then(res => {
            dispatch(departmentsData(res.data.departments))
        })
}

export const getGroupsData = (filterType, filterValue) => dispatch => {
    dispatch(requestGroups())
    axios.get('api/groups/', { params: { filterType, filterValue } })
        .then((res) => {
            dispatch(groupsData(res.data.groups))
            dispatch(requestGroupsFinished())
        })
}

export const getGroupsDataByDepartment = (department_id) => dispatch => {
    axios.get('api/groups/by-department', { params: {department_id} })
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

export const getStudentsData = (filterType, filterValue, group_id) => dispatch => {
    dispatch(requestStudents())
    axios.get('api/students/by-group', { params: { filterType, filterValue, group_id } })
        .then(res => {
            dispatch(studentsData(res.data.students))
            dispatch(requestStudentsFinished())
        })
}
