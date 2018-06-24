var ApplicationController = require('./application_controller')
var User = require('../models/User').initialize()

class RegistrationsController extends ApplicationController {
  /* POST registrations.json */
  create(req, res, next) {
    var user = new User(req.body)
    user.save(() => res.json(user))
  }

  /* PUT registrations.json */
  update(req, res, next) {
    
  }

  /* DELETE registrations.json */
  delete(req, res, next) {

  }
}

module.exports = RegistrationsController
