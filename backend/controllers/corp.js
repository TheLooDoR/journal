const Corp = require('../models/Corp')

module.exports.getAll = async (req, res) => {
    try {
        const corps = await Corp.findAll()
        res.status(200).json({
            corps
        })
    } catch (e) {
        console.log(e.message)
    }
}