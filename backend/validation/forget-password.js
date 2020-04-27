const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(email) {
    let errors = {};
    email = !isEmpty(email) ? email : '';

    if(!Validator.isEmail(email)) {
        errors.email = 'Неправильный email';
    }

    if(Validator.isEmpty(email)) {
        errors.email = 'Введите email';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}