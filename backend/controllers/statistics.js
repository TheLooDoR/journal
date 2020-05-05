const Sequelize = require('sequelize')
const Journal = require('../models/Journal')
const { Op } = require('sequelize')

module.exports.facultyStatistic = async (req, res) =>{
    try {
        // const missAmount = await Journal.findAll({
        //     attributes: [
        //         [Sequelize.fn('count', Sequelize.col('present')), 'present']
        //     ],
        //     where: {
        //         present: false
        //     }
        // })
        // const presentAmount = await Journal.findAll({
        //     attributes: [
        //         [Sequelize.fn('count', Sequelize.col('present')), 'present']
        //     ],
        //     where: {
        //         present: true
        //     }
        // })
        // const unsatisfactory = await Journal.findAll({
        //     attributes: [
        //         [Sequelize.fn('count', Sequelize.col('score')), 'amount']
        //     ],
        //     where: {
        //         score: {
        //             [Op.gte]: 0,
        //             [Op.lte]: 59,
        //             [Op.not]: null
        //         }
        //     }
        // })
        // const satisfactory = await Journal.findAll({
        //     attributes: [
        //         [Sequelize.fn('count', Sequelize.col('score')), 'amount']
        //     ],
        //     where: {
        //         score: {
        //             [Op.gte]: 60,
        //             [Op.lte]: 74,
        //             [Op.not]: null
        //         }
        //     }
        // })
        // const good = await Journal.findAll({
        //     attributes: [
        //         [Sequelize.fn('count', Sequelize.col('score')), 'amount']
        //     ],
        //     where: {
        //         score: {
        //             [Op.gte]: 75,
        //             [Op.lte]: 89,
        //             [Op.not]: null
        //         }
        //     }
        // })
        // const excellent = await Journal.findAll({
        //     attributes: [
        //         [Sequelize.fn('count', Sequelize.col('score')), 'amount']
        //     ],
        //     where: {
        //         score: {
        //             [Op.gte]: 90,
        //             [Op.not]: null
        //         }
        //     }
        // })
        // res.status(200).json({missAmount, presentAmount, unsatisfactory, satisfactory, good, excellent})
        let miss = 0, present = 0, unsatisfactory = 0, satisfactory = 0, good = 0, excellent = 0
        await Journal.findAll()
            .then(journal => {
                journal.map(el => {
                    if (el.score) {
                        if (el.score >= 0 && el.score <= 59) {
                            unsatisfactory++
                        } else if (el.score >= 60 && el.score <= 74) {
                            satisfactory++
                        } else if (el.score >= 75 && el.score <= 89) {
                            good++
                        } else {
                            excellent++
                        }
                    }
                    el.present ? present++ : miss++
                })
                res.status(200).json({present, miss, unsatisfactory, satisfactory, good, excellent})
            })
    } catch (e) {
        console.log(e.message)
    }

}