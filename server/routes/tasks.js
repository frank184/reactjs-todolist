var express = require('express')
var router = express.Router()

var TasksController = require('../controllers/tasks_controller')
//
// router.get('/', new TasksController().index)
// router.post('/', new TasksController().create)
// router.put('/:taskId', new TasksController().update)
// router.delete('/:taskId', new TasksController().delete)


router.get('/', (req, res) => new TasksController(req, res, 'index'))
router.post('/', (req, res) => new TasksController(req, res, 'create'))
router.put('/:id', (req, res) => new TasksController(req, res, 'update'))
router.delete('/:id', (req, res) => new TasksController(req, res, 'delete'))

module.exports = router
