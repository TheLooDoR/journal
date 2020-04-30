const db = require('../db/database')
const Group = require('../models/Group')
const Department = require('../models/Department')
const { Op } = require("sequelize");

module.exports.getAll = async (req, res) => {

    const filterValue = req.query.filterValue
    const filterType = req.query.filterType
    let where = {}
    switch(filterType) {
        case 'by-department':
            where = {
                [Op.or]: [
                    { '$departments.name$': { [Op.iLike]: '%' + filterValue + '%' } },
                    { '$departments.full_name$': { [Op.iLike]: '%' + filterValue + '%' } }
                ]
            }
            break
        case "by-name":
            where = {
                name: { [Op.iLike]: '%' + filterValue + '%' }
            }
            break
    }
    await Group.findAll({
        where: where,
        include: [
            {
                model: Department,
                required: true
            }
        ],
        order: [ 'name' ]
    })
        .then(groups => {
            res.status(200).json({
                groups
            })
        })
        .catch(err => {
            console.log(err.message)
        })
}

module.exports.getById = async (req, res) => {
    const { id } = req.params

    await Group.findOne({
        attributes: ['id', 'name'],
        where: {
          id
        },
        include: [{
            model: Department,
            required: true
        }]
    })
        .then(group => {
            res.status(200).json(group)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.getByDepartment = async (req, res) => {
    try {
        const groups = await Group.findAll({
            where: {
                department_id: req.params.department_id
            },
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json({
            groups
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.create = async (req, res) => {
    try {
        const group = {
            name: req.body.name
        }
        await Group.create(group)
            .then(result => res.status(201).json(result))
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.updateGroup = async (req, res) => {
    const { id, name, department_id } = req.body
    await Group.update(
        { name, department_id },
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

module.exports.removeGroup = async (req, res) => {
    await Group.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}