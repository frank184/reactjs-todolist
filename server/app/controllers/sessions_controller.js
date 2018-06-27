var ApplicationController = require('./application_controller')

class SessionsController extends ApplicationController {
  /* POST sessions.json */
  create() {
    var errors = {errors: { email_or_password: 'Email address or password is incorrect' }}
    User.findBy({email: this.user_params.email}, user => {
      if (user)
        user.isPassword(this.user_params.password, isPass => {
          if (isPass) {
            let sessionToken = user.generateSessionToken()
            user.save()
            // HTTPS version of setting the sessionToken cookie
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

  get user_params() {
    return {
      email: this.req.body.email,
      password: this.req.body.password,
    }
  }
} // end of class

module.exports = SessionsController
