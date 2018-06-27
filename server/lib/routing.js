var express = require('express')

class Routing {
  constructor() {
    this.route = ''
    this.scope = ''
    this.router = express.Router()
  }
  namespace(namespace, next) {
    this.scope = namespace
    if (next) next.call(this)
    this.scope = ''
  }
  match(verb, route, controller, action) {
    let routes = [
      `/${this.scope !== '' ? this.scope : route}`,
      `/${this.scope !== '' ? this.scope : route}.json`
    ]
    this.router[verb](routes, (req, res) => new controller(req, res, action))
  }
  root(controller, action) {
    this.get('/', controller, action)
  }
  get(route, controller, action)    {
    this.match('get', route, controller, action)
  }
  post(route, controller, action)   {
    this.match('post', route, controller, action)
  }
  patch(route, controller, action)  {
    this.match('patch', route, controller, action)
  }
  put(route, controller, action)    {
    this.match('put', route, controller, action)
  }
  delete(route, controller, action) {
    this.match('delete', route, controller, action)
  }
}

module.exports = Routing
