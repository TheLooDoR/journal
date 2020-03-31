const db = require('../db/database')
const Group = require('../models/Group')

module.exports.getAll = async (req, res) => {
    try {
        const groups = await Group.findAll()
        res.status(200).json({
            groups
        })
    } catch (e) {
        console.log(e.message)
    }
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

module.exports.update = async (req, res) => {
    try {
        await Group.update(
            {name: req.body.name},
            {where: { id: req.params.id }}
        )
        res.status(200).json({
            message: 'Обновление умпешно'
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.remove = async (req, res) => {
    try {
        await Group.destroy({ where: { id: req.params.id } })
        res.status(200).json({
            message: 'Группа была удалена'
        })
    } catch (e) {
        console.log(e.message)
    }
}