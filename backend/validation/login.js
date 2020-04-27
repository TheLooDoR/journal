const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}