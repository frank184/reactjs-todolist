var ApplicationController = require('./application_controller')
var Task = require('../models/Task').initialize()

class TasksController extends ApplicationController {
  /* GET tasks.json */
  index(req, res, next) {
    Task.all((tasks) => res.json(tasks))
  }

  /* POST tasks.json */
  create(req, res, next) {
    var task = new Task(req.body)
    task.save(() => res.json(task))
  }

  /* PUT tasks/1.json */
  update(req, res, next) {
    var taskId = req.params.taskId
    Task.find(taskId, (task) => {
      if (task)
        task.update(req.body, () => res.json(task))
      else
        res.status(404).send()
    })
  }

  /* DELETE tasks/1.json */
  delete(req, res, next) {
    var taskId = req.params.taskId
    Task.find(taskId, (task) => {
      if (task)
        task.delete(() => res.json(task))
      else
        res.status(404).send()
    })
  }
}

module.exports = TasksController
