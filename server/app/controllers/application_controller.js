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
    let hash = ''
    let sessionToken = this.req.cookies.sessionToken
    if (sessionToken) {
      let buffer = Buffer.from(sessionToken, 'base64')
      hash = secureToken.hash(buffer, 'session').toString('base64')
    }
    User.findBy({session_token: hash}, user => {
      if (next) next.call(this, user)
    })
  }
}

module.exports = ApplicationController
