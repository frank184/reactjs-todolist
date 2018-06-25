var ActiveRecord = require('./ActiveRecord')
var bcrypt = require('bcrypt')
var secureToken = require('secure-token')

class User extends ActiveRecord {
  constructor(options) {
    super(options)
  }

  // Y U NO WORK
  set password(value) {
    bcrypt.hash(value, 10, (err, hash) => {
      this.encrypted_password = hash
    })
  }

  isPassword(password, next) {
    bcrypt.compare(password, this.encrypted_password, (err, res) => {
      if (err) throw err
      if (next) next.call(this, res)
    })
  }

  generateSessionToken(next) {
    let sessionToken = secureToken.create()
    let hash = secureToken.hash(sessionToken, 'session')
    this.session_token
    return sessionToken
  }

  valid() {
    this.validatesPresenceOf('email')
    if (this.email && this.email.length !== 0) {
      this.validatesFormatOf('email', /[^@\s]+@[^@\s]+/)
      this.validatesUniquenessOf('email')
    }
    this.validatesPresenceOf('first_name')
    this.validatesPresenceOf('last_name')
    this.validatesPresenceOfEncrypted('password')
    return this.errorsEmpty()
  }

  toJSON() {
    return {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      errors: this.errors
    }
  }
}

module.exports = User
