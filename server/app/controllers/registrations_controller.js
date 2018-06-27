var ApplicationController = require('./application_controller')

class RegistrationsController extends ApplicationController {
  /* POST registrations.json */
  create() {
    var user = User.new(this.req.body)
    user.save((saved) => {
      if (saved) {
        let sessionToken = user.generateSessionToken()
        this.res.cookie('sessionToken', sessionToken.toString('base64'))
        user.save()
      }
      this.res.json(user)
    })
  }

  /* PUT registrations.json */
  update() {
    currentUser(user => user.update(user => this.res.json(user)))
    this.res.send(401).send()
  }

  /* DELETE registrations.json */
  delete() {
    currentUser(user => user.delete(() => this.res.json(user)))
  }
}

module.exports = RegistrationsController
