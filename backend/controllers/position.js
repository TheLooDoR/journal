const Position = require('../models/Position')

module.exports.getAll = async (req, res) => {
    try {
        const positions = await Position.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        res.status(200).json({
            positions
        })
    } catch (e) {
        console.log(e.message)
    }
}