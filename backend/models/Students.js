const Sequelize = require('sequelize')
const db = require('../db/database')
const Journal = require('../models/Journal')

const Students = db.define('student', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id'
        }
    },
    number_list: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    surname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    patronymic: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Journal.hasMany(Students, {foreignKey: 'id', sourceKey: 'student_id'})
Students.belongsTo(Journal, {foreignKey: 'id', targetKey: 'student_id'})

module.exports = Students