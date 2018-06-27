var ApplicationRecord = require('./application_record')
var SecureToken = require('secure-token')
var bcrypt = require('bcrypt')

class User extends ApplicationRecord {
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

  generateResetPasswordToken(next) {
    let resetPasswordToken = SecureToken.create()
    this.reset_password_token = SecureToken.hash(resetPasswordToken, 'session')
    return resetPasswordToken
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
      errors: this.errors,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}

module.exports = User
