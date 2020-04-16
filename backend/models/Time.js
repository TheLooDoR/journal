const Sequelize = require('sequelize')
const db = require('../db/database')
const Journal = require('../models/Journal')
const Schedule = require('../models/Schedule')

const Time = db.define('time', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
        unique: true
    }
})

Journal.hasMany(Time, {foreignKey: 'id', sourceKey: 'time_id'})
Time.belongsTo(Journal, {foreignKey: 'id', targetKey: 'time_id'})

Schedule.hasMany(Time, {foreignKey: 'id', sourceKey: 'time_id'})
Time.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'time_id'})

module.exports = Time