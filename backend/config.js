const isProduction = process.env.NODE_ENV === 'production'
exports.PORT = process.env.PORT || 5000;

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3000'

exports.DB_USER = isProduction
    ? process.env.DB_USER
    : 'postgres'

exports.DB_PASSWORD = isProduction
    ? process.env.DB_PASSWORD
    : '123456'

exports.DB_HOST = isProduction
    ? process.env.DB_HOST
    : 'localhost'

exports.DB_PORT = isProduction
    ? process.env.DB_PORT
    : '5432'

exports.DB_DATABASE = isProduction
    ? process.env.DB_DATABASE
    : 'journal'

exports.EMAIL_AUTH = {
    user: 'elJournalSU',
    pass: 'Temppass1'
}

exports.dialectOptions = isProduction
    ? {
        multipleStatements: true,
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    }
    : { multipleStatements: true, }