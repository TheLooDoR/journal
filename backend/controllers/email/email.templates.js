// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
const { CLIENT_ORIGIN } = require('../../config')

module.exports = {

    confirm: id => ({
        subject: 'ElJournal - Подтверждение почтового адреса',
        html: `Для подтверждения регистрации в веб-приложении "Электронный журнал" <a href='${CLIENT_ORIGIN}/email-confirm/${id}'> перейдите по данной ссылке </a>`,
        text: `Скопируйте и вставьте данную ссылку: ${CLIENT_ORIGIN}/email-confirm/${id}`
    }),

    forgotPassword: token => ({
        subject: 'ElJournal - Восстановление пароля',
        html: `Вы получили данное сообщение потому что вы (или кто-то другой) сделали запрос на восстановление пароля к вашему аккаунту.<br>
                Пожалуйста, перейдите по прикреплённой ссылке или вставьте её в браузер для завершения процесса восстановления в течение часа.<br>
                <a href="${CLIENT_ORIGIN}/reset/${token}">${CLIENT_ORIGIN}/reset/${token}</a><br>
                Если вы не отправляли запрос на восстановления пароля, пожалуйста проигнорируйте данное сообщение.`,
        text: 'Вы получили данное сообщение потому что вы (или кто-то другой) сделали запрос на восстановление пароля к вашему аккаунту.\n \n'
            + 'Пожалуйста, перейдите по прикрепленной ссылке или вставьте её в браузер для завершения процесса восстановления в течение часа.\n \n'
            + `${CLIENT_ORIGIN}/reset/${token}\n\n`
            + 'Если вы не отправляли запрос на восстановления пароля, пожалуйста проигнорируйте данное сообщение.'
    })

}