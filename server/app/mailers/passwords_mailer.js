const ApplicationMailer = require('./application_mailer')

class PasswordsMailer extends ApplicationMailer {
  create(user, token) {
    this.mail({
      to: user.email,
      subject: 'Password Reset Requested'
    })
  }
}

PasswordsMailer.defaults = {
  from: 'passwords@todolist.com',
}

module.exports = PasswordsMailer
