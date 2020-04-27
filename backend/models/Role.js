const Sequelize = require('sequelize')
const db = require('../db/database')
const User = require('../models/User')

const Role = db.define('role', {
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
        allowNull: false,
        unique: true
    },
    short_name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    }
})

User.hasMany(Role, {foreignKey: 'id', sourceKey: 'role_id'})
Role.belongsTo(User, {foreignKey: 'id', targetKey: 'role_id'})

module.exports = Role