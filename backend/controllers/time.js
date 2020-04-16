const Time = require('../models/Time')

module.exports.getAll = async (req, res) => {
    try {
        const time = await Time.findAll()
        res.status(200).json({
            time
        })
    } catch (e) {
        console.log(e.message)
    }
}