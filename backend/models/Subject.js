const Sequelize = require('sequelize')
const db = require('../db/database')
const Journal = require('../models/Journal')
const Schedule = require('../models/Schedule')

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
    },
    full_name: {
        type: Sequelize.TEXT,
    }
})


Journal.hasMany(Subject, {foreignKey: 'id', sourceKey: 'subject_id'})
Subject.belongsTo(Journal, {foreignKey: 'id', targetKey: 'subject_id'})

Schedule.hasMany(Subject, {foreignKey: 'id', sourceKey: 'subject_id'})
Subject.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'subject_id'})

module.exports = Subject