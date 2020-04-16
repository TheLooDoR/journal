const Sequelize = require('sequelize')
const db = require('../db/database')
const Journal = require('../models/Journal')
const Schedule = require('../models/Schedule')

const Corp = db.define('corp', {
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

Journal.hasMany(Corp, {foreignKey: 'id', sourceKey: 'corps_id'})
Corp.belongsTo(Journal, {foreignKey: 'id', targetKey: 'corps_id'})

Schedule.hasMany(Corp, {foreignKey: 'id', sourceKey: 'corps_id'})
Corp.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'corps_id'})

module.exports = Corp