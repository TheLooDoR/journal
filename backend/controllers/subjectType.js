const db = require('../db/database')
const SubjectType = require('../models/SubjectType')
const { Op } = require('sequelize')

module.exports.getAll = async (req, res) => {
    try {
        const subjectTypes = await SubjectType.findAll({
            where: {
              name: {[Op.iLike]: '%' + req.query.filterValue + '%'}
            },
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json({
            subjectTypes
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.getById = async (req, res) => {
    const { id } = req.params

    await SubjectType.findOne({
        attributes: ['id', 'name'],
        where: {
            id
        }
    })
        .then(subjectType => {
            res.status(200).json(subjectType)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.createSubjectType = async (req, res) => {
    const { name } = req.body

    await SubjectType.create({
        name
    })
        .then(() => res.status(200).json('Добавление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.updateSubjectType = async (req, res) => {
    const { id, name } = req.body
    await SubjectType.update(
        { name },
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

module.exports.removeSubjectType = async (req, res) => {
    await SubjectType.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}