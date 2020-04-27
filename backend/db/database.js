const Sequelize = require('sequelize')
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

module.exports = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,{
    dialect: 'postgres',
    dialectOptions: {
        multipleStatements: true
    },
    logging: console.log,
    define: {
        timestamps: false
    },
    operatorsAliases: Sequelize.Op
}); // Создаём подключение