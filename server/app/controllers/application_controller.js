var ActionDispatcher = require('../../lib/action_dispatcher')
var secureToken = require('secure-token')

class ApplicationController extends ActionDispatcher {
  authenticate(next) {
    this.isSignedIn(signedIn => {
      if (signedIn)
        if (next) next.call(this)
      else return this.res.status(403).send()
    })
  }

  isSignedIn(next) {
    this.currentUser(user => {
      if (next) next.call(this, user ? true : false)
    })
  }

  currentUser(next) {
    if (this.sessionToken) {
      let buffer = Buffer.from(this.sessionToken, 'base64')
      let hash = secureToken.hash(buffer, 'session').toString('base64')
      User.findBy({session_token: hash}, user => {
        if (next) next.call(this, user)
      })
    }
    if (next) next.call(this)
  }
} // end of class

module.exports = ApplicationController
