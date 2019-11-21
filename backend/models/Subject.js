const Sequelize = require('sequelize')
const db = require('../db/database')

const Subject = db.define('subject', {
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

module.exports = Subject