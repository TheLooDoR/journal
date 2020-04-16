const Sequelize = require('sequelize')
const Schedule = require('../models/Schedule')
const Subject = require('../models/Subject')
const Group = require('../models/Group')
const SubjectType = require('../models/SubjectType')
const WeekDay = require('../models/WeekDay')
const Time = require('../models/Time')
const Corp = require('../models/Corp')


module.exports.getUserSchedule = async (req, res) => {
    try {
        const todayDate = new Date()
        const todayDay = todayDate.getDay()
        let tomorrowDate = new Date()
        tomorrowDate.setDate(new Date().getDate() + 1)
        const tomorrowDay = tomorrowDate.getDay()
        const todaySchedule = await Schedule.findAll({
            attributes: [
                'user_id',
                [Sequelize.literal('"subjects"."name"'), 'subject'],
                [Sequelize.literal('"groups"."name"'), 'group'],
                [Sequelize.literal('"subject_types"."name"'), 'subject_type'],
                [Sequelize.literal('"times"."time"'), 'time'],
                [Sequelize.literal('"corps"."name"'), 'corp'],
                'hall'
            ],
            where: {
                user_id: +req.params.user_id,
                week_day_id: todayDay
            },
            include: [
                {
                    model: Subject,
                    attributes: [],
                    required: true
                },
                {
                    model: Group,
                    attributes: [],
                    required: true
                },
                {
                    model: SubjectType,
                    attributes: [],
                    required: true
                },
                {
                    model: WeekDay,
                    attributes: [],
                    required: true
                },
                {
                    model: Time,
                    attributes: [],
                    required: true
                },
                {
                    model: Corp,
                    attributes: [],
                    required: true
                }
            ],
            order: [['times', 'time', 'ASC']],
            raw: true
        })

        const tomorrowSchedule = await Schedule.findAll({
            attributes: [
                'user_id',
                [Sequelize.literal('"subjects"."name"'), 'subject'],
                [Sequelize.literal('"groups"."name"'), 'group'],
                [Sequelize.literal('"subject_types"."name"'), 'subject_type'],
                [Sequelize.literal('"times"."time"'), 'time'],
                [Sequelize.literal('"corps"."name"'), 'corp'],
                'hall'
            ],
            where: {
                user_id: +req.params.user_id,
                week_day_id: tomorrowDay
            },
            include: [
                {
                    model: Subject,
                    attributes: [],
                    required: true
                },
                {
                    model: Group,
                    attributes: [],
                    required: true
                },
                {
                    model: SubjectType,
                    attributes: [],
                    required: true
                },
                {
                    model: WeekDay,
                    attributes: [],
                    required: true
                },
                {
                    model: Time,
                    attributes: [],
                    required: true
                },
                {
                    model: Corp,
                    attributes: [],
                    required: true
                }
            ],
            order: [['times', 'time', 'ASC']],
            raw: true
        })
        res.status(200).json({
            todaySchedule,
            tomorrowSchedule
        })
    } catch (e) {
        console.log(e.message)
    }
}