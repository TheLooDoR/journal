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