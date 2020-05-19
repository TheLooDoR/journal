const Sequelize = require('sequelize')
const Journal = require('../models/Journal')
const Student = require('../models/Students')
const { Op } = require('sequelize')

module.exports.ratingByGroup = async (req, res) => {
    const { page, pageSize, group_id } = req.query
    const offset = (page) * pageSize
    const limit = pageSize
    await Journal.findAll({
        attributes: [
            'student_id',
            [Sequelize.col('students.surname'), 'surname'],
            [Sequelize.col('students.name'), 'name'],
            [Sequelize.col('students.patronymic'), 'patronymic'],
            [Sequelize.literal('SUM ( CASE WHEN present = \'f\' THEN 1 WHEN present = \'t\' THEN 0 END )'), 'total_miss'],
            [Sequelize.literal('round( SUM ( journal.score ) / COUNT ( journal.score ) :: FLOAT )'), 'score']
        ],
        include: [{
            model: Student,
            attributes: [],
            required: true,
            where: {
                group_id
            }
        }],
        group: [
            'student_id',
            [Sequelize.col('students.surname'), 'surname'],
            [Sequelize.col('students.name'), 'name'],
            [Sequelize.col('students.patronymic'), 'patronymic']
        ],
        order: [
            [Sequelize.col('score'), 'DESC NULLS LAST'],
            [Sequelize.col('total_miss'), 'ASC']
        ],
        limit,
        offset,
        raw: true,
        subQuery: false
    })
        .then(ratingElements => {
            Journal.findOne({
                attributes: [
                    [Sequelize.literal('COUNT(DISTINCT journal.student_id)::integer'), 'ratingCount']
                ],
                include: [{
                    model: Student,
                    attributes: [],
                    required: true,
                    where: {
                        group_id
                    }
                }],
                raw: true,
                subQuery: false
            })
                .then(elementsCount => {
                    res.status(200).json({ratingElements, elementsCount})
                })
                .catch(err => {
                    console.log(err.message)
                })
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.groupStatistic = async (req, res) => {
    const { group_id } = req.params
    let miss = 0, present = 0, unsatisfactory = 0, satisfactory = 0, good = 0, excellent = 0

    await Journal.findAll({
        include: [{
            model: Student,
            attributes: [],
            required: true,
            where: {
                group_id
            }
        }]
    })
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
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.facultyStatistic = async (req, res) => {
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
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}