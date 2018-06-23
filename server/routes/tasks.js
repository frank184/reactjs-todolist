var express = require('express')
var router = express.Router()

var Task = require('../models/Task').initialize()

/* GET tasks.json */
router.get('/', (req, res, next) => {
  Task.all((tasks) => res.json(tasks))
})

/* POST tasks.json */
router.post('/', (req, res, next) => {
  var task = new Task(req.body)
  task.save(() => res.json(task))
})

/* PUT tasks/1.json */
router.put('/:taskId', (req, res, next) => {
  var taskId = req.params.taskId
  Task.find(taskId, (task) => {
    if (task)
      task.update(req.body, () => res.json(task))
    else
      res.status(404).send()
  })
})

/* DELETE tasks/1.json */
router.delete('/:taskId', (req, res, next) => {
  var taskId = req.params.taskId
  Task.find(taskId, (task) => {
    if (task)
      task.delete(() => res.json(task))
    else
      res.status(404).send()
  })
})

module.exports = router
