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
        primaryKey: true
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
        primaryKey: true
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
        }
    },
    hall: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


module.exports = Schedule