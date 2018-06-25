var ApplicationController = require('./application_controller')

class PasswordsController extends ApplicationController {
  /* POST tasks.json */
  create() {
    // send email containing link with reset_password_token
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
