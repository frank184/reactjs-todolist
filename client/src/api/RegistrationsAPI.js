import Base from './Base'

class RegistrationsAPI {
  static create(user) {
    return this.api('/registrations.json', 'POST', user)
  }

  static update(user) {
    return this.api('/registrations.json', 'PUT', user)
  }
}

export default RegistrationsAPI
