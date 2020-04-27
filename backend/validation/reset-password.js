const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetPassword(data) {
    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.password, {min: 6, max: 24})) {
        errors.password = 'Пароль должен быть не меньше 6 символов и не больше 24 символов';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Введите пароль';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 24})) {
        errors.password_confirm = 'Пароль должен быть не меньше 6 символов и не больше 24 символов';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Пароли не совпадают';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Подтвердите пароль';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}