var express = require('express')
var router = express.Router()

var RegistrationsController = require('../controllers/registrations_controller')

router.post('/', new RegistrationsController().create)
router.put('/', new RegistrationsController().update)
router.delete('/', new RegistrationsController().delete)

module.exports = router
