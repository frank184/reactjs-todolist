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
            user.save()
            // this.res.cookie('sessionToken', sessionToken.toString('base64'), { httpOnly: true, secure: true })
            this.res.cookie('sessionToken', sessionToken.toString('base64'), { httpOnly: true })
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
    currentUser(user => {
      if (user) {
        user.update({session_token: ''})
        this.res.cookie('sessionToken', '')
        this.res.status(204).send()
      } else {
        this.res.status(404).send()
      }
    })

  }
}

module.exports = SessionsController
