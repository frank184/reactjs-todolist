var express = require('express')
var router = express.Router()

var SessionsController = require('../controllers/sessions_controller')

router.post('/', (req, res) => new SessionsController(req, res, 'create'))
router.delete('/', (req, res) => new SessionsController(req, res, 'delete'))

module.exports = router
