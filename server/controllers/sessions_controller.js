var ApplicationController = require('./application_controller')

class SessionsController extends ApplicationController {
  /* POST sessions.json */
  create() {
    var errors = {errors: { email_or_password: 'Email address or password is incorrect' }}
    User.findBy({email: this.req.body.email}, user => {
      if (user)
        user.isPassword(this.req.body.password, isPass => {
          if (isPass) {
            let sessionToken = user.generateSessionToken()
            this.res.writeHead(204, {
              'Set-Cookie': [
                `sessionToken=${secureToken.toString('base64')}`,
                'HttpOnly',
                'Secure'
              ].join(';')
            })
            return this.res.json(user)
          } else {
            return this.res.json(errors)
          }
        })
      else
        return this.res.json(errors)
    })
  }

  /* DELETE sessions.json */
  delete() {

  }
}

module.exports = SessionsController
