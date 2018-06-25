var express = require('express')
var router = express.Router()

var PasswordsController = require('../controllers/passwords_controller')

router.post('/', (req, res) => new PasswordsController(req, res, 'create'))
router.put('/', (req, res) => new PasswordsController(req, res, 'update'))

module.exports = router
