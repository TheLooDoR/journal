const Sequelize = require('sequelize')
const Schedule = require('../models/Schedule')
const Subject = require('../models/Subject')
const Group = require('../models/Group')
const SubjectType = require('../models/SubjectType')
const WeekDay = require('../models/WeekDay')
const Time = require('../models/Time')
const Corp = require('../models/Corp')
const User = require('../models/User')
const { Op } = require('sequelize')


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
                'hall',
                'first_week',
                'second_week'
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
                'hall',
                'first_week',
                'second_week'
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

module.exports.getAll = async (req, res) => {

    const filterValue = req.query.filterValue
    const filterType = req.query.filterType
    let where = {}
    switch(filterType) {
        case 'by-group':
            where = {
                '$groups.name$': { [Op.iLike]: '%' + filterValue + '%' }
            }
            break
        case "by-subject":
            where = {
                [Op.or]: [
                    {'$subjects.name$': { [Op.iLike]: '%' + filterValue + '%' }},
                    {'$subjects.full_name$': { [Op.iLike]: '%' + filterValue + '%' }}
                ]
            }
            break
        case 'by-user':
            where = {
                [Op.or]: [
                    {'$users.name$': { [Op.iLike]: '%' + filterValue + '%' }},
                    {'$users.surname$': { [Op.iLike]: '%' + filterValue + '%' }},
                    {'$users.patronymic$': { [Op.iLike]: '%' + filterValue + '%' }}
                ]
            }
    }
    await Schedule.findAll({
        attributes: [
            'subject_id',
            'group_id',
            'type_id',
            'time_id',
            'week_day_id',
            [Sequelize.literal('"users"."name"'), 'user_name'],
            [Sequelize.literal('"users"."surname"'), 'user_surname'],
            [Sequelize.literal('"users"."patronymic"'), 'user_patronymic'],
            [Sequelize.literal('"subjects"."full_name"'), 'subject'],
            [Sequelize.literal('"groups"."name"'), 'group'],
            [Sequelize.literal('"subject_types"."name"'), 'subject_type'],
            [Sequelize.literal('"times"."time"'), 'time'],
            [Sequelize.literal('"corps"."name"'), 'corp'],
            [Sequelize.literal('"week_days"."short_name"'), 'week_day'],
            'hall',
            'first_week',
            'second_week'
        ],
        where: where,
        include: [
            {
                model: User,
                attributes: [],
                required: true
            },
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
        raw: true,
        order: [
            [WeekDay, 'id', 'ASC'],
            [Time, 'time', 'ASC']
        ]
    })
        .then(schedule => {
            res.status(200).json({
                schedule
            })
        })
        .catch(err => {
            console.log(err.message)
        })
}

module.exports.getById = async (req, res) => {
    const { group_id, week_day_id, time_id, first_week, second_week } = req.query

    await Schedule.findOne({
        attributes: ['hall', 'first_week', 'second_week'],
        where: {
            group_id, week_day_id, time_id, first_week, second_week
        },
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'surname', 'patronymic'],
                required: true
            },
            {
                model: Subject,
                required: true
            },
            {
                model: Group,
                required: true
            },
            {
                model: SubjectType,
                required: true
            },
            {
                model: WeekDay,
                required: true
            },
            {
                model: Time,
                required: true
            },
            {
                model: Corp,
                required: true
            }
        ]
    })
        .then(schedule => {
            schedule ? res.status(200).json(schedule) : res.status(400).json('Занятие не найдено')
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
}

module.exports.createSchedule = async (req, res) => {
    try {
        const { user_id, subject_id, group_id, type_id, week_day_id, time_id, corps_id, hall, first_week, second_week } = req.body
        const candidate = await Schedule.findOne({
            where: { group_id, week_day_id, time_id}
        })
        if (candidate) {
            if (req.body.first_week && candidate.first_week) {
                res.status(400).json({ msg: 'Вы не можете добавить два занатия в одно время' })
            } else if (req.body.second_week && candidate.second_week) {
                res.status(400).json({ msg: 'Вы не можете добавить два занатия в одно время' })
            } else {
                await Schedule.create({
                    user_id, subject_id, group_id, type_id, week_day_id, time_id, corps_id, hall, first_week, second_week
                })
                    .then(() => res.status(200).json('Добавление успешно'))
                    .catch(err => {
                        console.log(err.message)
                        res.status(400).json(err.message)
                    })
            }
        } else {
            await Schedule.create({
                user_id, subject_id, group_id, type_id, week_day_id, time_id, corps_id, hall, first_week, second_week
            })
                .then(() => res.status(200).json('Добавление успешно'))
                .catch(err => {
                    console.log(err.message)
                    res.status(400).json(err.message)
                })
        }
    } catch (e) {
        console.log(e.message)
    }

}

module.exports.updateSchedule = async (req, res) => {
    const { user_id, subject_id, group_id, type_id, week_day_id, time_id, corp_id, hall, id, first_week, second_week } = req.body
    const candidates = await Schedule.findAll({
        where: { group_id, week_day_id, time_id}
    })
    const error = {}
    //more then one element consists
    if (candidates.length > 1) {
        //select updating element
         const updatingElement = await Schedule.findOne({
            where: {
                group_id: id.group_id,
                week_day_id: id.week_day_id,
                time_id: id.time_id,
                first_week: id.first_week,
                second_week: id.second_week
            }
        })
        // if data is not equal to existing data, then check if week is free
        if (updatingElement.first_week !== first_week || updatingElement.second_week !== second_week) {
            candidates.forEach(el => {
                if (first_week && !second_week) {
                    el.first_week ? error.msg = 'Вы не можете добавить несколько занятий на одно время' : null
                }
                if (!first_week && second_week) {
                    el.second_week ? error.msg = 'Вы не можете добавить несколько занятий на одно время' : null
                }
                if (first_week && second_week) {
                    el.first_week || el.second_week ? error.msg = 'Вы не можете добавить несколько занятий на одно время' : null
                }
            })
        }
    }
    if (error.msg) {
        res.status(400).json({msg: error.msg})
    } else {
        await Schedule.update(
            {
                user_id, subject_id, group_id, type_id, week_day_id, time_id, corp_id, hall, first_week, second_week
            },
            {
                where: {
                    group_id: id.group_id,
                    week_day_id: id.week_day_id,
                    time_id: id.time_id,
                    first_week: id.first_week,
                    second_week: id.second_week
                }
            }
        )
            .then(() => {
                res.status(200).json('Обновление успешно')
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

module.exports.removeSchedule = async (req, res) => {
    const { group_id, week_day_id, time_id, first_week, second_week } = req.query
    await Schedule.destroy({ where : { group_id, week_day_id, time_id, first_week, second_week } })
        .then(() => res.status(200).json('Удаление успешно'))
        .catch((err) => {
            console.log(err.message)
            res.status(401).json({msg: err.message})
        })
}