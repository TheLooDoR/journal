const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const templates = require('./email/email.templates')
const crypto = require('crypto')
const { Op } = require("sequelize");
const Role = require('../models/Role')
const Position = require('../models/Position')
const Department = require('../models/Department')
const Sequelize = require('sequelize')
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateForgetPassword = require('../validation/forget-password')
const validateResetPassword = require('../validation/reset-password')
const validateUpdateUserInput = require('../validation/update-user')
const sendEmail = require('./email/email.send')

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
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            department_id: req.body.department_id,
            position_id: req.body.position_id,
            role_id: req.body.role_id,
            phone_number: req.body.phone_number,
            admin: req.body.admin
        }
        try{
            await User.create(user)
                .then(result => {
                    res.status(201).json(result)
                    sendEmail(result.email, templates.confirm(result.id))
                })
        } catch(e) {
            console.log(e.message)
        }
    }
}

module.exports.confirmEmail = async (req, res) => {
    const user_id = req.params.id

    const user = await User.findOne({
        where: { id: user_id }
    })
        .catch(err => console.log(err.message))

    if (!user) {
        res.json({ msg: 'Пользователь не найден' })
    } else if (user && !user.confirmed) {
        await User.update(
            {
                confirmed: true
            },
            {
                where: {
                    id: user_id
                }
            }
        )
            .then(() => {
                res.json({ msg: 'Успешное подтверждение почты' })
            })
            .catch(err => console.log(err))
    } else  {
        res.json({ msg: 'Email уже подтвержден' })
    }
}

module.exports.repeatedConfirm = async (req, res) => {
    const email = req.params.email

    await User.findOne({
        where: { email }
    })
        .then(user => {
            sendEmail(user.email, templates.confirm(user.id))
                .then(res.json({ msg: 'Письмо с подтверждением было отправлено на почту.' }))
                .catch(res.json({ msg: 'Ошибка отправки. Попробуйте позже.' }))
        })
        .catch(err => console.log(err.message))
}

module.exports.sendResetMail = async (req, res) => {
    const email = req.body.email
    const {errors, isValid} = validateForgetPassword(email)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({
        where: { email }
    })
        .catch(err => console.log(err.message))

    if (!user) {
        res.status(403).json({ msg: 'Пользователь не найден. Попробуйте пройти регистрацию.' })
    } else {
        const token = crypto.randomBytes(20).toString('hex')
        await User.update(
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 1000 * 60 * 60
            },
            { where: { email } }
        )
            .then(() => {
                return User.findOne({
                    where: {email}
                })
            })
            .then(user => {
                 sendEmail(user.email, templates.forgotPassword(user.resetPasswordToken))
                    .then(res.json({ msg: 'Письмо с восстановлением было отправлено на почту.'}))
                    .catch(() => res.json({ msg: 'Ошибка отправки. Попробуйте позже.' }))
            })
            .catch(err => console.log(err.message))
    }
}

module.exports.checkResetToken = async (req, res) => {
    const { resetPasswordToken } = req.query

    await User.findOne({
        where: {
            resetPasswordToken,
            resetPasswordExpires: {
                [Op.gt]: Date.now()
            }
        }
    }).then(user => {
        if (!user) {
            res.status(408).json({ msg: 'Ссылка восстановления пароля не действительна' })
        } else {
            res.status(200).json({
                email: user.email
            })
        }
    })
}

module.exports.resetPasswordViaEmail = async (req, res) => {
    const { email } = req.body

    const { errors, isValid } = validateResetPassword(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    await User.findOne({
        where: { email }
    }).then(user => {
        if (!user) {
            res.status(404).json({ msg: 'Пользователь не найден' })
        } else {
            const salt = bcrypt.genSaltSync(10)
            bcrypt.hash(req.body.password, salt)
                .then(hashedPassword => {
                    User.update(
                        {
                            password: hashedPassword,
                            resetPasswordToken: null,
                            resetPasswordExpires: null
                        },
                        { where: { email } }
                    )
                })
                .then(() => {
                    res.status(200).json({ msg: 'Пароль успешно изменён' })
                })
                .catch(err => console.log(err.message))
        }
    })
}

module.exports.login = async (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const candidate = await User.findOne({
        where: {
            email: req.body.email.toLowerCase()
        }
    })

    if (candidate) {
        const role = await Role.findOne({
            where : { id: candidate.role_id }
        })
        if (candidate.confirmed) {
            //Check password
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if (passwordResult) {
                //Generate token
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate.id,
                    name: candidate.name,
                    surname: candidate.surname,
                    patronymic: candidate.patronymic,
                    role: role.name,
                }, 'secret', {expiresIn: 60 * 60 * 12})

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
            errors.email = 'Почтовый адрес не подтвержден.'
            res.status(400).json(errors)
        }

    } else {
        errors.email = 'Пользователь не найден'
        return res.status(404).json(errors)
    }
}

module.exports.getAll = async  (req, res) => {
    //filter value
    let filterValue = req.query.filterValue
    filterValue = filterValue.toLowerCase()
    //filter type (role, department, position)
    const filterType = req.query.filterType
    //keys to filter by (full name and short name)
    let filterKeys = {
        full_name: null,
        short_name: null
    }
    //set keys according to filter type
    switch(filterType) {
        case 'by-role':
            filterKeys = {
                full_name: '$roles.full_name$',
                short_name: '$roles.short_name$'
            }
            break
        case 'by-position':
            filterKeys = {
                full_name: '$positions.name$',
                short_name: '$positions.short_name$'
            }
            break
        case 'by-department':
            filterKeys = {
                full_name: '$departments.full_name$',
                short_name: '$departments.name$'
            }
    }

    const { currentUserId } = req.query

    await User.findAll({
        attributes: [
            'id', 'name', 'surname', 'patronymic', 'email', 'phone_number',
            [Sequelize.literal('"roles"."short_name"'), 'role'],
            [Sequelize.literal('"positions"."short_name"'), 'position'],
            [Sequelize.literal('"departments"."name"'), 'department']
        ],
        where: {
            [Op.and]: {
                [Op.or]: [
                    { [filterKeys.full_name]:  {[Op.like]: '%' + filterValue + '%'}},
                    { [filterKeys.short_name]: { [Op.like]: '%' + filterValue + '%' } }
                ],
                [Op.not]: { id: currentUserId }
            }

        },
        include: [
            {
                model: Role,
                attributes: [],
                required: true
            },
            {
                model: Position,
                attributes: [],
                required: true
            },
            {
                model: Department,
                attributes: [],
                required: true
            }
        ]
    })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({ msg: 'Пользователи не найдены' })
        })
}

module.exports.getById = async (req, res) => {
    let user_id = req.params.id

    await User.findOne({
        attributes: ['id', 'email', 'phone_number'],
        where: {
            id: user_id
        },
        include: [
            {
                model: Role,
                required: true
            },
            {
                model: Position,
                required: true
            },
            {
                model: Department,
                required: true
            }
        ]
    })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
}

module.exports.updateUser = async (req, res) => {

    const { errors, isValid } = validateUpdateUserInput(req.body);
    const { user_id, department_id, position_id, email, phone_number, role_id } = req.body

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const candidate = await User.findOne({
        where: {
            email: email,
            [Op.not]: {
                id: user_id
            }
        }
    })

    if (candidate) {
        res.status(409).json({
            email: 'Почтовый адрес занят, попробуйте использовать другой.'
        })
    } else {
        await User.update(
            {
                department_id,
                position_id,
                email,
                phone_number,
                role_id
            },
            { where: { id: user_id } }
        )
            .then(() => {
                res.status(200).json('Обновление успешно')
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

module.exports.removeUser = async (req, res) => {
    await User.destroy({ where : { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch((err) => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}
