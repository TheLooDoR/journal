import axios from 'axios';
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    SET_CURRENT_USER, UPDATE_CURRENT_USER
} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { store } from 'react-notifications-component'
import {setError} from "./error";

const requestRegister = () => {
    return {
        type: REGISTER_REQUEST
    }
}

const registerSuccess= () => {
    return {
        type: REGISTER_SUCCESS
    }
}

const registerFailure = () => {
    return {
        type: REGISTER_FAILURE
    }
}

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSuccess= () => {
    return {
        type: LOGIN_SUCCESS
    }
}

const loginFailure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

export const registerUser = (user, history) => dispatch => {
    dispatch(requestRegister())
    axios.post('/api/users/register', user)
        .then(res => {
            dispatch(setError({}))
            history.push('/login')
            store.addNotification({
                title: 'Подтверждение',
                message: 'На указанный адрес было выслано письмо подтверждения электронной почты.',
                type: "default",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            dispatch(registerSuccess())
        })
        .catch(err => {
            dispatch(registerFailure())
            dispatch(setError(err.response.data));
        });
}

export const loginUser = (user) => dispatch => {
    dispatch(requestLogin())
    axios.post('/api/users/login', user)
        .then(res => {
            dispatch(setError({}))
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            dispatch(loginSuccess())
        })
        .catch(err => {
            dispatch(loginFailure())
            dispatch(setError(err.response.data));
        });
}

export const sendResetPasswordMail = (history, email) => dispatch => {
    axios.post('/api/users/forgot-password', {email})
        .then(res => {
            dispatch(setError({}))
            history.push('/login')
            store.addNotification({
                title: 'Востановление пароля',
                message: res.data.msg,
                type: "default",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
        })
        .catch(err => {
            dispatch(setError(err.response.data))
            if (err.response.data.msg) {
                store.addNotification({
                    title: 'Востановление пароля',
                    message: err.response.data.msg,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true
                    }
                });
            }
        })
}

export const resetPasswordViaEmail = (history, data) => dispatch => {
    axios.post('/api/users/reset', data)
        .then((res) => {
            dispatch(setError({}))
            store.addNotification({
                title: 'Востановление пароля',
                message: res.data.msg,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            history.push('/')
        })
        .catch(err => {
            dispatch(setError(err.response.data))
            if (err.response.data.msg) {
                store.addNotification({
                    title: 'Востановление пароля',
                    message: err.response.data.msg,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true
                    }
                });
            }
        })
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const updateCurrentUser = userData => {
    return {
        type: UPDATE_CURRENT_USER,
        payload: userData
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if (history) {
        history.push('/login');
    }
}