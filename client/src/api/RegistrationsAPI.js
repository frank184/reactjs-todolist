import Base from './Base'

class RegistrationsAPI extends Base {
  static create(user) {
    return this.api('/registrations.json', 'POST', user)
  }

  static update(user) {
    return this.api('/registrations.json', 'PUT', user)
  }

  static delete(user) {
    return this.api('/registrations.json', 'DELETE')
  }
}

export default RegistrationsAPI
