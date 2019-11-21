const Sequelize = require('sequelize')
const db = require('../db/database')

const SubjectType = db.define('subject_type', {
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

module.exports = SubjectType