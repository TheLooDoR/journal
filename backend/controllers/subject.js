const db = require('../db/database')
const Subject = require('../models/Subject')
const { Op } = require('sequelize')

module.exports.getAll = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
            where: {
                [Op.or]: {
                    name: { [Op.iLike]: '%' + req.query.filterValue + '%' },
                    full_name: { [Op.iLike]: '%' + req.query.filterValue + '%' }
                }
            },
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json({
            subjects
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.getById = async (req, res) => {
    const { id } = req.params

    await Subject.findOne({
        attributes: ['id', 'name', 'full_name'],
        where: {
            id
        }
    })
        .then(subject => {
            res.status(200).json(subject)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.createSubject = async (req, res) => {
    const { name, full_name } = req.body

    await Subject.create({
        name,
        full_name
    })
        .then(() => res.status(200).json('Добавление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.updateSubject = async (req, res) => {
    const { id, name, full_name } = req.body
    await Subject.update(
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

module.exports.removeSubject = async (req, res) => {
    await Subject.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}