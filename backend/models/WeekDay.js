const Sequelize = require('sequelize')
const db = require('../db/database')
const Schedule = require('../models/Schedule')

const WeekDay = db.define('week_day', {
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

Schedule.hasMany(WeekDay, {foreignKey: 'id', sourceKey: 'week_day_id'})
WeekDay.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'week_day_id'})

module.exports = WeekDay