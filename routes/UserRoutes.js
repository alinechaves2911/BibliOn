const router = require('express').Router()

//Controllers imports
const UserController = require('../controllers/UserController')

//helpers


//controllers
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)


module.exports = router