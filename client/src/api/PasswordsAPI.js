import Base from './Base'

class PasswordsAPI extends Base {
  static create(user) {
    return this.api('/passwords.json', 'POST', user)
  }

  static update() {
    return this.api('/passwords.json', 'PUT')
  }
}

export default PasswordsAPI
