const Routing = require('../lib/routing')
var routing = new Routing()

var TasksController = require('../app/controllers/tasks_controller')
var RegistrationsController = require('../app/controllers/registrations_controller')
var SessionsController = require('../app/controllers/sessions_controller')
var PasswordsController = require('../app/controllers/passwords_controller')

routing.root(TasksController, 'index')
routing.namespace('tasks', () => {
  routing.get('/', TasksController, 'index')
  routing.get('/:id', TasksController, 'show')
  routing.post('/', TasksController, 'create')
  routing.put('/:id', TasksController, 'create')
  routing.delete('/:id', TasksController, 'create')
})

routing.namespace('registrations', () => {
  routing.post('/', RegistrationsController, 'create')
  routing.put('/', RegistrationsController, 'update')
  routing.delete('/', RegistrationsController, 'delete')
})

routing.namespace('sessions', () => {
  routing.post('/', SessionsController, 'create')
  routing.delete('/', SessionsController, 'delete')
})

routing.namespace('passwords', () => {
  routing.post('/', PasswordsController, 'create')
  routing.put('/', PasswordsController, 'update')
})

module.exports = routing.router
