const Corp = require('../models/Corp')
const { Op } = require('sequelize')

module.exports.getAll = async (req, res) => {
    try {
        const corps = await Corp.findAll({
            where: {
                name: {[Op.iLike]: '%' + req.query.filterValue + '%'}
            },
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json({
            corps
        })
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.getById = async (req, res) => {
    const { id } = req.params

    await Corp.findOne({
        attributes: ['id', 'name'],
        where: {
            id
        }
    })
        .then(corp => {
            res.status(200).json(corp)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.createCorp = async (req, res) => {
    const { name } = req.body

    await Corp.create({
        name
    })
        .then(() => res.status(200).json('Добавление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.updateCorp = async (req, res) => {
    const { id, name } = req.body
    await Corp.update(
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

module.exports.removeCorp = async (req, res) => {
    await Corp.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}