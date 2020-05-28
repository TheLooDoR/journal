const WeekDay = require('../models/WeekDay')

module.exports.getAll = async (req, res) => {

    await WeekDay.findAll()
        .then(weekDays => {
            res.status(200).json({weekDays})
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}