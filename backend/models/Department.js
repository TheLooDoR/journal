const Sequelize = require('sequelize')
const db = require('../db/database')

const Department = db.define('department', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    full_name: {
        type: Sequelize.TEXT,
        unique: true
    }
})

module.exports = Department