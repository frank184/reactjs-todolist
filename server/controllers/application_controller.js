var secureToken = require('secure-token')

var ActionDispatcher = require('./action_dispatcher')

class ApplicationController extends ActionDispatcher {
  authenticate() {

  }

  currentUser(next) {
    // Implement Sessions first
    if (next) next.call(this, user)
  }
}

module.exports = ApplicationController
