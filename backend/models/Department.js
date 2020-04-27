const Sequelize = require('sequelize')
const db = require('../db/database')
const User = require('../models/User')
const Group = require('../models/Group')

const Department = db.define('department', {
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
    }
})

User.hasMany(Department, {foreignKey: 'id', sourceKey: 'department_id'})
Department.belongsTo(User, {foreignKey: 'id', targetKey: 'department_id'})

Group.hasMany(Department, {foreignKey: 'id', sourceKey: 'department_id'})
Department.belongsTo(Group, {foreignKey: 'id', targetKey: 'department_id'})

module.exports = Department