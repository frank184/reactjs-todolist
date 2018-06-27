var ApplicationController = require('./application_controller')

class RegistrationsController extends ApplicationController {
  /* POST registrations */
  create() {
    var user = User.new(this.user_params)
    user.save((saved) => {
      if (saved) {
        let sessionToken = user.generateSessionToken()
        this.res.cookie('sessionToken', sessionToken.toString('base64'))
        user.save()
      }
      this.res.json(user)
    })
  }

  /* PUT registrations */
  update() {
    currentUser(user => user.update(user => this.res.json(user)))
    this.res.send(401).send()
  }

  /* DELETE registrations */
  delete() {
    currentUser(user => user.delete(() => this.res.json(user)))
  }

  get user_params() {
    return {
      email: this.req.body.email,
      password: this.req.body.password,
      first_name: this.req.body.first_name,
      last_name: this.req.body.last_name,
    }
  }
}

module.exports = RegistrationsController
