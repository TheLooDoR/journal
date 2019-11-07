const Sequelize = require('sequelize')
const db = require('../db/database')

const Group = db.define('group', {
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
    }
})

module.exports = Group