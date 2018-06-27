var express = require('express')
var path = require('path')
var fs = require('fs')

class Routing {
  constructor() {
    this.route = ''
    this.scope = ''
    this.router = express.Router()
    this.controllers = {}

    var dirPath = path.join(__dirname, '..', 'app', 'controllers');
    fs.readdirSync(dirPath).forEach(file => {
      var filePath = path.join(dirPath, file)
      this.controllers[file.replace(/([a-z]*)_([a-z]*)(\.js)/, '$1')] = require(filePath)
    });
  }

  namespace(namespace, next) {
    this.scope = namespace
    if (next) next.call(this)
    this.scope = ''
  }

  match(verb, route, controller, action) {
    route = this.scope !== '' ? this.scope + route : route
    this.router[verb]([route, route+'.json'], (req, res) => new this.controllers[controller](req, res, action))
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
