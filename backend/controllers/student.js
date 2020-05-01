const db = require('../db/database')
const Students = require('../models/Students')
const Group = require('../models/Group')
const Department = require('../models/Department')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')

module.exports.getAll = async (req, res) => {

}

module.exports.getByGroup = async (req, res) => {
    const group_id = req.query.group_id
    let filterValue = req.query.filterValue
    const filterType = req.query.filterType

    let where = {}
    switch(filterType) {
        case 'by-name':
            where =  {
                [Op.or]: [
                    { 'name': { [Op.iLike]: '%' + filterValue + '%' } },
                    { 'surname': { [Op.iLike]: '%' + filterValue + '%' } },
                    { 'patronymic': { [Op.iLike]: '%' + filterValue + '%' } }
                ]
            }
            break
        case 'by-budget': {
            if (filterValue.toLowerCase().match('бюджет') || filterValue.toLowerCase().match('б')) {
                where = { budget: true }
            }
            else if (filterValue.toLowerCase().match('контракт') || filterValue.toLowerCase().match('к')) {
                where = { budget: false }
            }
            else {
                where = {}
            }
        }
        break
    }

    await Students.findAll({
        attributes: ['id', 'name', 'surname', 'patronymic', 'budget', 'email', 'phone_number',
            [Sequelize.literal('"groups"."name"'), 'group']
        ],
        where: {
            ...where,
            group_id
        },
        include: [
            {
                model: Group,
                attributes: [],
                required: true
            }
        ],
        order: [ 'surname', 'name', 'patronymic']
    })
        .then(students => {
            res.status(200).json({students})
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.getById = async (req, res) => {
    const { id } = req.params

    await Students.findOne({
        attributes: ['id', 'name', 'surname', 'patronymic', 'budget', 'email', 'phone_number'],
        where: {
            id
        },
        include: [{
            model: Group,
            include: [{
                model: Department,
                required: true
            }],
            required: true
        }]
    })
        .then(student => {
            res.status(200).json(student)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.createStudent = async (req, res) => {
    const {     name, surname, patronymic, email, phone_number, group_id, budget } = req.body

    await Students.create({
        name,
        surname,
        patronymic,
        email,
        phone_number,
        group_id,
        budget
    })
        .then(() => res.status(200).json('Добавление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.updateStudent = async (req, res) => {
    const { id , name, surname, patronymic, group_id, budget, email, phone_number } = req.body
    await Students.update(
        { name, surname, patronymic, group_id, budget, email, phone_number },
        { where: { id } }
    )
        .then(() => {
            res.status(200).json('Обновление успешно')
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.removeStudent = async (req, res) => {
    await Students.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}