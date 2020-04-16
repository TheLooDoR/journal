const Sequelize = require('sequelize')
const db = require('../db/database')
const Schedule = require('../models/Schedule')

const Group = db.define('group', {
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
    department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id'
        }
    }
})

Schedule.hasMany(Group, {foreignKey: 'id', sourceKey: 'group_id'})
Group.belongsTo(Schedule, {foreignKey: 'id', targetKey: 'group_id'})

module.exports = Group