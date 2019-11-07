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