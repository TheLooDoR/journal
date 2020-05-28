const Journal = require('../models/Journal')
const Students = require('../models/Students')
const Date = require('../models/Date')
const Time = require('../models/Time')
const User = require('../models/User')
const Group = require('../models/Group')
const Department = require('../models/Department')
const SubjectType = require('../models/SubjectType')
const Subject = require('../models/Subject')
const { Op } = require("sequelize");
const Sequelize = require('sequelize')

module.exports.getLatestJournals = async (req, res) => {

    await Journal.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('students.group_id')), 'group_id'],
            [Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'updated_at'],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name'), 'group'],
            [Sequelize.col('students->groups->departments.name'), 'department'],
            [Sequelize.col('subjects.name'), 'subject'],
            [Sequelize.col('subject_types.name'), 'subject_type'],
            [Sequelize.literal('string_agg(DISTINCT concat(users.surname, \' \', substr(users.name, 1, 1), \'. \', substr(users.patronymic, 1, 1), \'.\'), \', \')'), 'user']
        ],
        include: [
            {
                model: Students,
                attributes: [],
                required: true,
                include: [{
                    model: Group,
                    attributes: [],
                    required: true,
                    include: [{
                        model: Department,
                        attributes: [],
                        required: true
                    }]
                }]
            },
            {
                model: Subject,
                attributes: [],
                required: true
            },
            {
                model: SubjectType,
                attributes: [],
                required: true
            },
            {
                model: User,
                attributes: [],
                required: true
            }
        ],
        group: [
            [Sequelize.col('students.group_id')],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name')],
            [Sequelize.col('students->groups->departments.name')],
            [Sequelize.col('subjects.name')],
            [Sequelize.col('subject_types.name')],
        ],
        order: [[Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'DESC' ]],
        raw: true,
        subQuery: false,
        limit: 10
    })
        .then(latest => {
            res.status(200).json(latest)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.getJournalsByType = async (req, res) => {
    const { type_id, user_id, isAdmin } = req.body
    let where = {}
    isAdmin ?
        where = {
            type_id
        } :
        where = {
            user_id,
            type_id
        }
    await Journal.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('students.group_id')), 'group_id'],
            [Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'updated_at'],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name'), 'group'],
            [Sequelize.col('students->groups->departments.name'), 'department'],
            [Sequelize.col('subjects.name'), 'subject'],
            [Sequelize.col('subject_types.name'), 'subject_type'],
            [Sequelize.literal('string_agg(DISTINCT concat(users.surname, \' \', substr(users.name, 1, 1), \'. \', substr(users.patronymic, 1, 1), \'.\'), \', \')'), 'user']
        ],
        where,
        include: [
            {
                model: Students,
                attributes: [],
                required: true,
                include: [{
                    model: Group,
                    attributes: [],
                    required: true,
                    include: [{
                        model: Department,
                        attributes: [],
                        required: true
                    }]
                }]
            },
            {
                model: Subject,
                attributes: [],
                required: true
            },
            {
                model: SubjectType,
                attributes: [],
                required: true
            },
            {
                model: User,
                attributes: [],
                required: true
            }
        ],
        group: [
            [Sequelize.col('students.group_id')],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name')],
            [Sequelize.col('students->groups->departments.name')],
            [Sequelize.col('subjects.name')],
            [Sequelize.col('subject_types.name')],
        ],
        order: [[Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'DESC' ]],
        raw: true,
        subQuery: false
    })
        .then(latest => {
            res.status(200).json(latest)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.getJournalsBySubject = async (req, res) => {
    const { subject_id, user_id, isAdmin } = req.body
    let where = {}
    isAdmin ?
        where = {
            subject_id
        } :
        where = {
            user_id,
            subject_id
        }
    await Journal.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('students.group_id')), 'group_id'],
            [Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'updated_at'],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name'), 'group'],
            [Sequelize.col('students->groups->departments.name'), 'department'],
            [Sequelize.col('subjects.name'), 'subject'],
            [Sequelize.col('subject_types.name'), 'subject_type'],
            [Sequelize.literal('string_agg(DISTINCT concat(users.surname, \' \', substr(users.name, 1, 1), \'. \', substr(users.patronymic, 1, 1), \'.\'), \', \')'), 'user']
        ],
        where,
        include: [
            {
                model: Students,
                attributes: [],
                required: true,
                include: [{
                    model: Group,
                    attributes: [],
                    required: true,
                    include: [{
                        model: Department,
                        attributes: [],
                        required: true
                    }]
                }]
            },
            {
                model: Subject,
                attributes: [],
                required: true
            },
            {
                model: SubjectType,
                attributes: [],
                required: true
            },
            {
                model: User,
                attributes: [],
                required: true
            }
        ],
        group: [
            [Sequelize.col('students.group_id')],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name')],
            [Sequelize.col('students->groups->departments.name')],
            [Sequelize.col('subjects.name')],
            [Sequelize.col('subject_types.name')],
        ],
        order: [[Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'DESC' ]],
        raw: true,
        subQuery: false
    })
        .then(latest => {
            res.status(200).json(latest)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.getJournalsByGroup = async (req, res) => {
    const { group_id, user_id, isAdmin } = req.body
    let where = {}
    isAdmin ?
        where = {} :
        where = {
            user_id,
        }
    await Journal.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('students.group_id')), 'group_id'],
            [Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'updated_at'],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name'), 'group'],
            [Sequelize.col('students->groups->departments.name'), 'department'],
            [Sequelize.col('subjects.name'), 'subject'],
            [Sequelize.col('subject_types.name'), 'subject_type'],
            [Sequelize.literal('string_agg(DISTINCT concat(users.surname, \' \', substr(users.name, 1, 1), \'. \', substr(users.patronymic, 1, 1), \'.\'), \', \')'), 'user']
        ],
        where,
        include: [
            {
                model: Students,
                attributes: [],
                required: true,
                include: [{
                    model: Group,
                    attributes: [],
                    required: true,
                    where: {
                        id: group_id
                    },
                    include: [{
                        model: Department,
                        attributes: [],
                        required: true
                    }]
                }]
            },
            {
                model: Subject,
                attributes: [],
                required: true
            },
            {
                model: SubjectType,
                attributes: [],
                required: true
            },
            {
                model: User,
                attributes: [],
                required: true
            }
        ],
        group: [
            [Sequelize.col('students.group_id')],
            'subject_id',
            'type_id',
            [Sequelize.col('students->groups.name')],
            [Sequelize.col('students->groups->departments.name')],
            [Sequelize.col('subjects.name')],
            [Sequelize.col('subject_types.name')],
        ],
        order: [[Sequelize.fn('MAX', Sequelize.col('journal.updated_at')), 'DESC' ]],
        raw: true,
        subQuery: false
    })
        .then(latest => {
            res.status(200).json(latest)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err.message)
        })
}

module.exports.getData = async (req, res) => {
    try {
        const errors = {}

        //Students search by group
        const studentsGroup = await Students.findAll({
            where: {
                group_id: req.body.group_id
            }
        })
        let students_id = []
        for(let i = 0; i < studentsGroup.length; i++) {
            students_id.push(studentsGroup[i].id)
        }

        let where
        req.body.isAdmin ?
            where = {
                subject_id: req.body.subject_id,
                type_id: req.body.type_id,
                student_id: {
                    [Op.in]: students_id
                }
            } :
            where = {
                user_id: req.body.user_id,
                subject_id: req.body.subject_id,
                type_id: req.body.type_id,
                student_id: {
                    [Op.in]: students_id
                }
            }


        //Students search by journal
        const studentFromJournal = await Journal.findAll({
            attributes: ['student_id'],
            group: ['student_id'],
            where: where
        })
        let studentsFromJournal_id = []
        for(let i = 0; i < studentFromJournal.length; i++) {
            studentsFromJournal_id.push(studentFromJournal[i].student_id)
        }

        const dates = await Journal.findAll({
            attributes: ['date_id', 'time_id', [Sequelize.literal('"times"."time"'), 'time'], [Sequelize.literal('"dates"."date"'), 'date']],
            where: where,
            group: ['date_id', 'time_id', 'times.time', 'dates.date'],
            include: [
                {
                    model: Time,
                    attributes: [],
                    required: true
                },
                {
                    model: Date,
                    attributes: [],
                    required: true
                }
            ],
            order: [
                ['dates', 'date', 'ASC'],
                ['times', 'time', 'ASC']
            ],
            raw: true
        })

        //Students
        const students = await Students.findAll({
            where: {
                id: {
                    [Op.in]: studentsFromJournal_id
                }
            },
            order: [
                ['surname', 'ASC'],
                ['name', 'ASC'],
                ['patronymic', 'ASC']
            ]
        })
        const journal = await Journal.findAll({
            where: where,
            include: [
                {
                    model: Date,
                    required: true
                },
                {
                    model: Time,
                    required: true
                }
            ],
            order: [
                ['dates', 'date', 'ASC'],
                ['times', 'time', 'ASC']
            ]
        })
        const user = await Journal.findOne({
            attributes: [
                [Sequelize.literal('string_agg(DISTINCT concat(users.surname, \' \', substr(users.name, 1, 1), \'.' +
                    ' \', substr(users.patronymic, 1, 1), \'.\'), \', \')'), 'name']
            ],
            where: where,
            include: [
                {
                    model: Students,
                    attributes: [],
                    required: true,
                },
                {
                    model: User,
                    attributes: [],
                    required: true
                }
            ],
            group: [
                [Sequelize.col('students.group_id')],
                'subject_id',
                'type_id',
            ],
            raw: true,
            subQuery: false
        })
        if (Array.isArray(journal) && journal.length === 0) {
            errors.search = 'Журнал не найден'
            return res.status(404).json(errors)
        } else {
            res.status(200).json({
                journal,
                students,
                dates,
                user
            })
        }

    } catch (e) {
        console.log(e.message)
    }
}

module.exports.updateStudentData = async (req, res) => {
    let error = {
        message: null
    }
    try {
        const studentData = await Journal.update({
                present: req.body.present,
                note: req.body.note,
                score: req.body.score,
                valid_miss: req.body.valid_miss
            },
            {
                where : {
                    user_id: req.body.user_id,
                    date_id: req.body.date_id,
                    subject_id: req.body.subject_id,
                    student_id: req.body.student_id,
                    type_id: req.body.type_id,
                    time_id: req.body.time_id
                }
            }
        ).catch( () => {
            error.message = 'Ошибка обновления'
        })
        if (error.message) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json({
                studentData
            })
        }

    } catch (e) {
        console.log(e.message)
    }
}

module.exports.addTaskByDate = async (req, res) => {
    const error = {
        message: null
    }
    try {
        const date = await Date.findOrCreate({
            where: {
                date: req.body.date
            },
            defaults: {
                date: req.body.date
            }
        })
        const studentsGroup = await Students.findAll({
            where: {
                group_id: req.body.group_id
            }
        })

        //get all students from group
        let studentsGroup_ids = []
        for(let i = 0; i < studentsGroup.length; i++) {
            studentsGroup_ids.push(studentsGroup[i].id)
        }
        if (studentsGroup_ids.length === 0) {
            error.message = 'Группа не имеет студентов'
        }
        //get all students from journal
        const studentsJournal = await Journal.findAll({
            attributes: ['student_id'],
            where: {
                student_id: {
                    [Op.in]: studentsGroup_ids
                }
            },
            group: ['student_id']
        })
        let studentsJournal_ids = []
        for(let i = 0; i < studentsJournal.length; i++) {
            studentsJournal_ids.push(studentsJournal[i].student_id)
        }

        //check if all students consist
        let checker = (arr, target) => target.every(v => arr.includes(v))
        //if student which is not in the all tasks consists insert it
        if (!checker(studentsJournal_ids, studentsGroup_ids)) {
            //get all dates from journal
            const journalDates = await Journal.findAll({
                attributes: ['date_id', 'time_id', 'user_id'],
                where: {
                    student_id: {
                        [Op.in]: studentsJournal_ids
                    },
                    subject_id: req.body.subject_id,
                    type_id: req.body.type_id
                },
                group: ['date_id', 'time_id', 'user_id']
            })
            //filter only students which doesn`t consist in all tasks
            const filtered_ids = studentsGroup_ids.filter(i => !studentsJournal_ids.includes(i))
            //insert student in all existing tasks
            journalDates.map(date => {
                filtered_ids.map(async student_id => {
                    try {
                        //insert missing student in past tasks
                        await Journal.create({
                            user_id: date.user_id,
                            subject_id: req.body.subject_id,
                            student_id: student_id,
                            present: true,
                            note: '',
                            score: null,
                            date_id: date.date_id,
                            type_id: req.body.type_id,
                            valid_miss: false,
                            time_id: date.time_id,
                        })
                    } catch (e) {
                        console.log(e.message)
                    }
                })
            })
        }
        //get times with request date
        const time_ids = await Journal.findAll({
            attributes: ['time_id'],
            where: {
                student_id: {
                    [Op.in]: studentsGroup_ids
                },
                date_id: date[0].id,
            },
            group: ['time_id']
        })
        let time_ids_array = []
        for(let i = 0; i < time_ids.length; i++) {
            time_ids_array.push(time_ids[i].time_id)
        }
        //if task with request time consists return error, else create task
        if (time_ids_array.includes(req.body.time_id)) {
            error.message = 'У группы не может быть несколько занятий одновременно. Попробуйте выбрать другое время.'
        } else {
            studentsGroup.map(async el => {
                try {
                    await Journal.create({
                        user_id: req.body.user_id,
                        subject_id: req.body.subject_id,
                        student_id: el.id,
                        present: true,
                        note: '',
                        score: null,
                        date_id: date[0].id,
                        type_id: req.body.type_id,
                        valid_miss: false,
                        time_id: req.body.time_id
                    })
                } catch (e) {
                    error.message = 'Ошибка добавления'
                    console.log(e.message)
                }
            })
        }
        if (error.message) {
            res.status(400).json(error.message)
        } else {
            res.status(201).json('Добавление успешно')
        }
    } catch (e) {
        console.log(e.message)
    }
}

module.exports.deleteTaskByDate = async (req, res) => {
    const { group_id, type_id, date_id, subject_id, time_id } = req.query
    Journal.destroy({
        where: {
            type_id,
            date_id,
            time_id,
            subject_id
        },
        include: [{
            model: Students,
            attributes: [],
            where: {
                group_id
            },
            required: true
        }]
    })
        .then(() => {
            res.status(200).json('Удаление успешно')
        })
        .catch(err => {
            console.log(err.message)
            res.status(401).json(err.message)
        })
}