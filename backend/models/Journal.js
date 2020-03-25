const Sequelize = require('sequelize')
const db = require('../db/database')

const Journal = db.define('journal', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        foreignKey: true
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'subjects',
            key: 'id'
        },
        primaryKey: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'students',
            key: 'id'
        },
        primaryKey: true
    },
    present: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    valid_miss: {
        type: Sequelize.BOOLEAN
    },
    note: {
        type: Sequelize.TEXT
    },
    score: {
        type: Sequelize.INTEGER
    },
    date_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'dates',
            key: 'id'
        },
        primaryKey: true
    },
    type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'dates',
            key: 'id'
        },
        primaryKey: true
    }
})


module.exports = Journal