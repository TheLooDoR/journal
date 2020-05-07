const Department = require('../models/Department')
const {Op} = require('sequelize')

module.exports.getAll = async (req, res) => {
    try {
        const departments = await Department.findAll({
            where: {
                [Op.or]: {
                    name: {[Op.iLike]: '%' + req.query.filterValue + '%'},
                    full_name: {[Op.iLike]: '%' + req.query.filterValue + '%'}
                }
            },
            order: [
                ['name', 'ASC'],
                ['full_name', 'ASC']
            ]
        })
        res.status(200).json({
            departments
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.getById = async (req, res) => {
    const { id } = req.params

    await Department.findOne({
        attributes: ['id', 'name', 'full_name'],
        where: {
            id
        }
    })
        .then(department => {
            res.status(200).json(department)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.createDepartment = async (req, res) => {
    const { name, full_name } = req.body

    await Department.create({
        name, full_name
    })
        .then(() => res.status(200).json('Добавление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.updateDepartment = async (req, res) => {
    const { id, name, full_name } = req.body
    await Department.update(
        { name, full_name },
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

module.exports.removeDepartment = async (req, res) => {
    await Department.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}