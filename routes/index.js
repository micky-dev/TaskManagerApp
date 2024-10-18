//?-----External Modules
const Router = require('express').Router
const passport = require('passport')

//?-----Controllers Middleware
const taskContorller = require('../controllers/taskController')
const userController = require('../controllers/userController')


//?-----Routes
const router = Router()

router.get('/', taskContorller.default)

router.get('/sign-up', (req, res, next) => {
    res.render('register')
})
.post('/sign-up',userController.register)

module.exports = router

router.get('/login', (req, res, next) => {
    res.render('login')
})
.post('/login', passport.authenticate('local'))


