const Role = require('../models/Role')

module.exports.getAll = async (req, res) => {
    try {
        const roles = await Role.findAll({
            order: [
                ['full_name', 'ASC']
            ]
        })
        res.status(200).json({
            roles
        })
    } catch (e) {
        console.log(e.message)
    }
}