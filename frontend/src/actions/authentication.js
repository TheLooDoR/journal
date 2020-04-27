import axios from 'axios';
import {  SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { store } from 'react-notifications-component'
import {setError} from "./error";

export const registerUser = (user, history) => dispatch => {
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
        })
        .catch(err => {
            dispatch(setError(err.response.data));
        });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            dispatch(setError({}))
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
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

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    if (history) {
        history.push('/login');
    }
}