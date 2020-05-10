import axios from "axios";
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
    REQUEST_GROUPS_FINISHED,
    REQUEST_STUDENTS,
    REQUEST_STUDENTS_FINISHED, REQUEST_SUBJECT_TYPES, REQUEST_SUBJECT_TYPES_FINISHED,
    REQUEST_SUBJECTS,
    REQUEST_SUBJECTS_FINISHED
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

const weekDays = weekDaysData => {
    return {
        type: GET_WEEK_DAYS,
        payload: weekDaysData
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

export const requestGroups = () => {
    return {
        type: REQUEST_GROUPS,
        payload: true
    }
}

export  const requestGroupsFinished = () => {
    return {
        type: REQUEST_GROUPS_FINISHED,
        payload: false
    }
}

export const requestStudents = () => {
    return {
        type: REQUEST_STUDENTS,
        payload: true
    }
}

export const requestStudentsFinished = () => {
    return {
        type: REQUEST_STUDENTS_FINISHED,
        payload: false
    }
}

export const requestSubjects = () => {
    return {
        type: REQUEST_SUBJECTS,
        payload: true
    }
}

export const requestSubjectsFinished = () => {
    return {
        type: REQUEST_SUBJECTS_FINISHED,
        payload: false
    }
}

export const requestSubjectTypes = () => {
    return {
        type: REQUEST_SUBJECT_TYPES,
        payload: true
    }
}

export const requestSubjectTypesFinished = () => {
    return {
        type: REQUEST_SUBJECT_TYPES_FINISHED,
        payload: false
    }
}

export const requestCorps = () => {
    return {
        type: REQUEST_CORPS,
        payload: true
    }
}

export const requestCorpsFinished = () => {
    return {
        type: REQUEST_CORPS_FINISHED,
        payload: false
    }
}

export const requestDepartments = () => {
    return {
        type: REQUEST_DEPARTMENTS,
        payload: true
    }
}

export const requestDepartmentsFinished = () => {
    return {
        type: REQUEST_DEPARTMENTS_FINISHED,
        payload: false
    }
}

export const getDepartmentsData = (filterValue='') => dispatch => {
    dispatch(requestDepartments())
    axios.get('api/departments/', {params: {filterValue}})
        .then(res => {
            dispatch(departmentsData(res.data.departments))
            dispatch(requestDepartmentsFinished())
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
    dispatch(requestGroups())
    axios.get('api/groups/by-department', { params: {department_id} })
        .then(res => {
            dispatch(groupsData(res.data.groups))
            dispatch(requestGroupsFinished())
        })
}

export const getSubjectTypesData = ( filterValue='' ) => dispatch => {
    dispatch(requestSubjectTypes())
    axios.get('api/subject-types/', {params: {filterValue}})
        .then((res) => {
            dispatch(subjectTypesData(res.data.subjectTypes))
            dispatch(requestSubjectTypesFinished())
        })
}

export const getSubjectsData = ( filterValue='' ) => dispatch => {
    dispatch(requestSubjects())
    axios.get('api/subjects/', {params: {filterValue}})
        .then(res => {
            dispatch(subjectsData(res.data.subjects))
            dispatch(requestSubjectsFinished())
        })
}

export const getTimeData = () => dispatch => {
    axios.get('api/time/')
        .then(res => dispatch(timeData(res.data.time)))
}

export const getWeekDaysData = () => dispatch => {
    axios.get('api/week-days')
        .then(res => {
            dispatch(weekDays(res.data.weekDays))
        })
}

export const getCorpsData = (filterValue='') => dispatch => {
    dispatch(requestCorps())
    axios.get('api/corps/', {params: {filterValue}})
        .then(res => {
            dispatch(corpsData(res.data.corps))
            dispatch(requestCorpsFinished())
        })
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
