const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUpdateUserInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Неправильный email';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Введите email';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}