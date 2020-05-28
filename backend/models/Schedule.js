const Sequelize = require('sequelize')
const db = require('../db/database')

const Schedule = db.define('schedule', {
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
        foreignKey: true
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id'
        },
        primaryKey: true
    },
    type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'types',
            key: 'id'
        },
        foreignKey: true
    },
    week_day_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'week_days',
            key: 'id'
        },
        primaryKey: true
    },
    time_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'times',
            key: 'id'
        },
        primaryKey: true
    },
    corps_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'corps',
            key: 'id'
        },
        foreignKey: true
    },
    hall: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    first_week: {
        type: Sequelize.BOOLEAN,
        primaryKey: true
    },
    second_week: {
        type: Sequelize.BOOLEAN,
        primaryKey: true
    }
})


module.exports = Schedule