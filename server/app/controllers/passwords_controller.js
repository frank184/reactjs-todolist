const ApplicationController = require('./application_controller')
const PasswordsMailer = require('../mailers/passwords_mailer')
var url = require('url')

class PasswordsController extends ApplicationController {
  /* POST passwords */
  create() {
    User.findBy({email: this.reset_password_params}, user => {
      if (user) {
        let resetPasswordToken = user.generateResetPasswordToken()
        let mailer = PasswordsMailer.create(resetPasswordToken.toString('base64'))
        mailer.send(() => this.res.status(202))
      } else {
        this.res.status(404).send()
      }
    })
  }

  /* PUT passwords?reset_password_token=xxxxxxxxxxxxxxxxxxxxxxxxxxxx */
  update() {
    let querystring = url.parse(request.url, true).query
    let resetPasswordToken// = get resetPasswordToken querystring
    User.findBy({reset_password_token: reset_password_token}, user => {
      user.update(user_params)
      this.res.json(user)
    })
  }

  get reset_password_params() {
    return { email: this.req.body.email }
  }

  get user_params() {
    return {
      password: this.req.body.password,
      password_confirmation: this.req.body.password_confirmation,
    }
  }
}

module.exports = PasswordsController
