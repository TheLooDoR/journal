const Sequelize = require('sequelize')
const db = require('../db/database')
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

Schedule.hasMany(Corp, {foreignKey: 'id', sourceKey: 'corps_id'})
Corp.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'corps_id'})

module.exports = Corp