const Sequelize = require('sequelize')
const db = require('../db/database')
const Journal = require('../models/Journal')

const Date = db.define('date', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    date: {
        allowNull: false,
        type: Sequelize.DATEONLY
    },
    time: {
        type: Sequelize.TIME
    }
})

Journal.hasMany(Date, {foreignKey: 'id', sourceKey: 'date_id'})
Date.belongsTo(Journal, {foreignKey: 'id', targetKey: 'date_id'})

module.exports = Date