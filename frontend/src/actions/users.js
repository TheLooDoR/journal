import Axios from "axios";
import {GET_USERS, REQUEST_USERS_DATA, REQUEST_USERS_DATA_FINISHED} from "./types";

const usersData = usersData => {
    return {
        type: GET_USERS,
        payload: usersData
    }
}

export const requestUsersData = () => {
    return {
        type: REQUEST_USERS_DATA,
        payload: true
    }
}

export const requestUsersDataFinished = () => {
    return {
        type: REQUEST_USERS_DATA_FINISHED,
        payload: false
    }
}

export const getUsersData = (filterType, filterValue, currentUserId ) => dispatch => {
    dispatch(requestUsersData())
    Axios.get(`api/users/`, { params: {filterValue, filterType, currentUserId} })
        .then(res => {
            dispatch(usersData(res.data))
            dispatch(requestUsersDataFinished())
        })
}

export const getSelectUsersData = () => dispatch => {
    Axios.get('api/users/users-select')
        .then(res => {
            dispatch(usersData(res.data.users))
        })
}
