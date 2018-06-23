import Base from './Base'

class SessionsAPI extends Base {
  static create() {
    return this.api('/sessions.json', 'POST')
  }

  static delete() {
    return this.api('/sessions.json', 'DELETE')
  }
}

export default SessionsAPI
