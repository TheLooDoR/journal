const nodemailer = require('nodemailer')
const { EMAIL_AUTH } = require('../../config')

const credentials = {
    service: 'gmail',
    auth: {
        // These environment variables will be pulled from the .env file
        user: EMAIL_AUTH.user,
        pass: EMAIL_AUTH.pass
    }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, content) => {

    const contacts = {
        from: EMAIL_AUTH.user,
        to
    }

    const email = Object.assign({}, content, contacts)

    await transporter.sendMail(email)
}