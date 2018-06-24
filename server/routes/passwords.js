var express = require('express')
var router = express.Router()

var PasswordsController = require('../controllers/passwords_controller')

router.post('/', new PasswordsController().create)
router.put('/', new PasswordsController().update)

module.exports = router
