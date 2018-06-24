var ApplicationController = require('./application_controller')
var User = require('../models/User').initialize()

class SessionsController extends ApplicationController {
  /* POST sessions.json */
  create(req, res, next) {
    var errors = {errors: { email_or_password: 'Email address or password is incorrect' }}
    User.findBy({email: req.body.email}, user => {
      if (user)
        user.isPassword(req.body.password, isPass => {
          if (isPass)
            return res.json(user)
          else
            return res.json(errors)
        })
      else
        return res.json(errors)
    })
  }

  /* DELETE sessions.json */
  delete(req, res, next) {

  }
}

module.exports = SessionsController
