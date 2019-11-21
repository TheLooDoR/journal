const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

module.exports.register = async (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const candidate = await User.findOne({ where: {email: req.body.email}})

    if(candidate){
        //Email already used
        res.status(409).json({
            email: 'Почтовый адрес занят, попробуйте использовать другой.'
        })
    } else {
        //Create user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = {
            name: req.body.name,
            surname: req.body.surname,
            patronymic: req.body.patronymic,
            email: req.body.email.toLowerCase(),
            password: bcrypt.hashSync(password, salt),
            admin: req.body.admin
        }

        try{
            await User.create(user)
                .then(result => {
                    res.status(201).json(result)
                })
        } catch(e) {
            console.log(e.message)
        }
    }
}

module.exports.login = async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const candidate = await User.findOne({where: {email: req.body.email.toLowerCase()}})

    if (candidate) {
        //Check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //Generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id,
                admin: candidate.admin,
                name: candidate.name,
                surname: candidate.surname,
                patronymic: candidate.patronymic
            }, 'secret', {expiresIn: 12 * (60 * 60)})

            res.status(200).json({
                success: true,
                token: `Bearer ${token}`
            })
        } else {
            //Wrong password
            errors.password = 'Неправильный пароль'
            return  res.status(401).json(errors)
        }
    } else {
        errors.email = 'User not found'
        return res.status(404).json(errors)
    }
}

module.exports.me = async (req, res) => {
    // return res.json({
    //     id: req.user.id,
    //     name: req.user.name,
    //     email: req.user.email
    // })
    res.send(req.user)
}

