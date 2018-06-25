var ActiveRecord = require('./ActiveRecord')
var bcrypt = require('bcrypt')
var SecureToken = require('secure-token')

class User extends ActiveRecord {
  set password(value) {
    this._password = value
    this.encrypted_password = bcrypt.hashSync(value, 10)
  }

  get password() {
    return this._password
  }

  isPassword(password, next) {
    bcrypt.compare(password, this.encrypted_password, (err, res) => {
      if (err) throw err
      if (next) next.call(this, res)
    })
  }

  generateSessionToken(next) {
    let sessionToken = SecureToken.create()
    this.session_token = SecureToken.hash(sessionToken, 'session').toString('base64')
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
    if (!this.id) this.validatesPresenceOfEncrypted('password')
    if (!this.id) this.validatesLengthOf('password', 8)
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
