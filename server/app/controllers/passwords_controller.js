const ApplicationController = require('./application_controller')
const PasswordsMailer = require('../mailers/passwords_mailer')

class PasswordsController extends ApplicationController {
  /* POST tasks.json */
  create() {
    User.findBy({email: req.body}, user => {
      if (user) {
        let resetPasswordToken = user.generateResetPasswordToken()
        let mailer = PasswordsMailer.create(resetPasswordToken.toString('base64'))
        mailer.send(() => this.res.status(202))
      } else {
        this.res.status(404).send()
      }
    })
  }

  /* PUT tasks/1.json?reset_password_token=reset_password_token */
  update() {
    let resetPasswordToken// = get querystring
    User.findBy({reset_password_token: reset_password_token}, user => {
      user.update({password: password})
      this.res.json(user)
    })
  }
}

module.exports = PasswordsController
