const isProduction = process.env.NODE_ENV === 'production'
exports.PORT = process.env.PORT || 5000;

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3000'


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