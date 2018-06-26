import APIBase from './APIBase'

class SessionsAPI extends APIBase {
  static create(user) {
    return this.api('/sessions.json', 'POST', user)
  }

  static delete() {
    return this.api('/sessions.json', 'DELETE')
  }
}

export default SessionsAPI
