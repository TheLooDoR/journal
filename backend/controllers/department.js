const Department = require('../models/Department')

module.exports.getAll = async (req, res) => {
    try {
        const departments = await Department.findAll()
        res.status(200).json({
            departments
        })
    } catch (e) {
        console.log(e.message)
    }
}