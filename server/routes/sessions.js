var express = require('express')
var router = express.Router()

var SessionsController = require('../controllers/sessions_controller')

router.post('/', new SessionsController().create)
router.delete('/', new SessionsController().delete)

module.exports = router
