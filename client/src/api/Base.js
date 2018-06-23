import 'whatwg-fetch'

class Base {
  static api(url, method, body) {
    console.log(method, url, body ? body : '')
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authentication': Base.HTTP_AUTH
      },
      mode: 'same-origin',
      redirect: 'follow',
      credentials: 'include',
      method: method,
      body: JSON.stringify(body)
    }).then(response => response.json())
  }
}

export default Base
