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

module.exports = new Sequelize( `${config.DATABASE_URL}`, {
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        multipleStatements: true,
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    },
    logging: console.log,
    define: {
        timestamps: false
    },
    operatorsAliases: Sequelize.Op
}); // Создаём подключение