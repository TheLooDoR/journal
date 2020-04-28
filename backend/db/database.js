const Sequelize = require('sequelize')
const config = require('../config')
require('dotenv').config()

// module.exports = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db.db',
//     dialectOptions: {
//         multipleStatements: true
//     },
//     logging: console.log,
//     define: {
//         timestamps: false
//     },
//     operatorsAliases: Sequelize.Op
// }); // Создаём подключение

module.exports = new Sequelize(config.DB_DATABASE, config.DB_USER, config.DB_PASSWORD,{
    host: config.DB_HOST,
    dialect: 'postgres',
    dialectOptions: config.dialectOptions,
    logging: console.log,
    define: {
        timestamps: false
    },
    operatorsAliases: Sequelize.Op
}); // Создаём подключение