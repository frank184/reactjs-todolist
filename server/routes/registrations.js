var express = require('express')
var router = express.Router()

var RegistrationsController = require('../controllers/registrations_controller')

router.post('/', (req, res) => new RegistrationsController(req, res, 'create'))
router.put('/', (req, res) => new RegistrationsController(req, res, 'update'))
router.delete('/', (req, res) => new RegistrationsController(req, res, 'delete'))

module.exports = router
