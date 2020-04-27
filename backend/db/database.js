const Sequelize = require('sequelize')

module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: './db.db',
    dialectOptions: {
        multipleStatements: true
    },
    logging: console.log,
    define: {
        timestamps: false
    },
    operatorsAliases: Sequelize.Op
}); // Создаём подключение

// module.exports = new Sequelize('journal', 'postgres', '123456',{
//     dialect: 'postgres',
//     dialectOptions: {
//         multipleStatements: true
//     },
//     logging: console.log,
//     define: {
//         timestamps: false
//     },
//     operatorsAliases: Sequelize.Op
// }); // Создаём подключение