const isProduction = process.env.NODE_ENV === 'production'
exports.PORT = process.env.PORT || 5000;

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3000'


exports.EMAIL_AUTH = {
    user: 'elJournalSU',
    pass: 'Temppass1'
}

exports.DATABASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : 'postgres://xhvbivnitqnmwh:10fc0a5feef0c11a56551715d6a58026b831b50db762b5fd9d9465e54ddd0509@ec2-34-192-173-173.compute-1.amazonaws.com:5432/da788li2ne3tg0'

exports.dialectOptions = isProduction
    ? {
        multipleStatements: true,
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    }
    : { multipleStatements: true, }