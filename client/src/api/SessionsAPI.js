import Base from './Base'

class SessionsAPI extends Base {
  static create(user) {
    return this.api('/sessions.json', 'POST', user)
  }

  static delete() {
    return this.api('/sessions.json', 'DELETE')
  }
}

export default SessionsAPI
