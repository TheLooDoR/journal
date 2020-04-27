const Sequelize = require('sequelize')
const db = require('../db/database')
const User = require('../models/User')

const Position = db.define('position', {
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
    short_name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    }
})

User.hasMany(Position, {foreignKey: 'id', sourceKey: 'position_id'})
Position.belongsTo(User, {foreignKey: 'id', targetKey: 'position_id'})

module.exports = Position