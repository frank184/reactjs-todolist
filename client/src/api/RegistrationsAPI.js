import APIBase from './APIBase'

class RegistrationsAPI extends APIBase {
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
