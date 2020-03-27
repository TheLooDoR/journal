const db = require('../db/database')
const Subject = require('../models/Subject')

module.exports.getAll = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
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

module.exports.create = async (req, res) => {
    try {
        const subject = {
            name: req.body.name
        }
        await Subject.create(subject)
            .then(result => res.status(201).json(result))
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.update = async (req, res) => {
    try {
        await Subject.update(
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
        await Subject.destroy({ where: { id: req.params.id } })
        res.status(200).json({
            message: 'Дисциалина была удалена'
        })
    } catch (e) {
        console.log(e.message)
    }
}