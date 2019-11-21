const db = require('../db/database')
const SubjectType = require('../models/SubjectType')

module.exports.getAll = async (req, res) => {
    try {
        const subjectTypes = await SubjectType.findAll()
        res.status(200).json({
            subjectTypes
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.create = async (req, res) => {
    try {
        const subjectType = {
            name: req.body.name
        }
        await SubjectType.create(subjectType)
            .then(result => res.status(201).json(result))
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.update = async (req, res) => {
    try {
        await SubjectType.update(
            {name: req.body.name},
            {where: { id: req.params.id }}
        )
        res.status(200).json({
            message: 'Обновление уcпешно'
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.remove = async (req, res) => {
    try {
        await SubjectType.destroy({ where: { id: req.params.id } })
        res.status(200).json({
            message: 'Дисциалина была удалена'
        })
    } catch (e) {
        console.log(e.message)
    }
}