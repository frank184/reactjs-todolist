var ActiveRecord = require('./ActiveRecord')
var bcrypt = require('bcrypt')

class User extends ActiveRecord {
  constructor(options) {
    super(options)
  }

  set password(value) {
    bcrypt.hash(value, 10, (err, hash) => this.encrypted_password = hash)
  }

  isPassword(password, next) {
    bcrypt.compare(password, this.encrypted_password, (err, res) => {
      if (next) next.call(this, res)
    })
  }

  valid() {
    this.validatesPresenceOf('email')
    this.validatesPresenceOf('first_name')
    this.validatesPresenceOf('last_name')
    this.validatesPresenceOf('encrypted_password')
    return this.errorsEmpty()
  }
}

module.exports = User
