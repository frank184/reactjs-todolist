var express = require('express')
var router = express.Router()

var TasksController = require('../controllers/tasks_controller')

router.get('/', new TasksController().index)
router.post('/', new TasksController().create)
router.put('/:taskId', new TasksController().update)
router.delete('/:taskId', new TasksController().delete)

module.exports = router
