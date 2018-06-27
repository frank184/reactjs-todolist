const Routing = require('../lib/routing')
var routing = new Routing()

// routing.root(controller, action)
routing.root('tasks', 'index')
routing.namespace('/tasks', () => {
  routing.get('/', 'tasks', 'index')
  routing.get('/:id', 'tasks', 'show')
  routing.post('/', 'tasks', 'create')
  routing.put('/:id', 'tasks', 'update')
  routing.delete('/:id', 'tasks', 'delete')
})

routing.namespace('/registrations', () => {
  routing.post('/', 'registrations', 'create')
  routing.put('/', 'registrations', 'update')
  routing.delete('/', 'registrations', 'delete')
})

routing.namespace('/sessions', () => {
  routing.post('/', 'sessions', 'create')
  routing.delete('/', 'sessions', 'delete')
})

routing.namespace('/passwords', () => {
  routing.post('/', 'passwords', 'create')
  routing.put('/', 'passwords', 'update')
})

module.exports = routing.router
