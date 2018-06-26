import APIBase from './APIBase'

class PasswordsAPI extends APIBase {
  static create(user) {
    return this.api('/passwords.json', 'POST', user)
  }

  static update() {
    return this.api('/passwords.json', 'PUT')
  }
}

export default PasswordsAPI
