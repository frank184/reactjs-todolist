import 'whatwg-fetch'

class APIBase {
  static parseJSON = (response) => response.json()
  static checkStatus = (response) => {
    if (response.status >= 500) throw 'Server Internal Error'
    if (response.status === 401) throw 'Unauthorized'
    if (response.status === 403) throw 'Forbidden'
    if (response.status === 404) throw 'Not Found'
    else return response
  }

  static index() {
    return this.api(this.url, 'GET')
  }

  static find(id) {
    return this.api(`${this.url}/${id}`, 'GET')
  }

  static create(obj) {
    return this.api(this.url, 'POST', obj)
  }

  static update(obj) {
    return this.api(`${this.url}/${obj.id}`, 'PUT', obj)
  }

  static delete(id) {
    return this.api(`${this.url}/${id}`, 'DELETE')
  }

  static api(url, method, body) {
    console.log(method, url, body ? body : '')
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'same-origin',
      method: method,
      body: JSON.stringify(body)
    })
    .then(this.checkStatus)
    .then(this.parseJSON)
  }
}

export default APIBase
