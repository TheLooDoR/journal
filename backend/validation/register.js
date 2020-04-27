const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Имя должно иметь от 2 до 30 символов';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Введите имя';
    }

    if(!Validator.isLength(data.surname, { min: 2, max: 30 })) {
        errors.surname = 'Фамилия должна быть от 2 до 30 символов';
    }

    if(Validator.isEmpty(data.surname)) {
        errors.surname = 'Введите фамилию';
    }

    if(!Validator.isLength(data.patronymic, { min: 2, max: 30 })) {
        errors.patronymic = 'Отчество должно быть от 2 до 30 символов';
    }

    if(Validator.isEmpty(data.patronymic)) {
        errors.patronymic = 'Введите отчество';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Неправильный email';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Введите email';
    }

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