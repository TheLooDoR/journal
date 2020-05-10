const Sequelize = require('sequelize')
const db = require('../db/database')
const Schedule = require('./Schedule')

const User = db.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    surname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    patronymic: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id'
        }
    },
    position_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'positions',
            key: 'id'
        }
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    phone_number: {
        type: Sequelize.TEXT
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken: {
        type: Sequelize.TEXT,
        defaultValue: null
    },
    resetPasswordExpires: {
        type: Sequelize.DATE,
        defaultValue: null
    }
})

Schedule.hasMany(User, {foreignKey: 'id', sourceKey: 'user_id'})
User.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'user_id'})

module.exports = User