//?-----External Modules
const Router = require('express').Router
const passport = require('passport')

//?-----Controllers Middleware
const taskContorller = require('../controllers/taskController')
const userController = require('../controllers/userController')
const { taskModel } = require('../models/taskModel')


//?-----Routes
const router = Router()

//?-----Homepage
router.get('/', taskContorller.default)

//?-----Auth Routes

//*-----Sign-up
router.route('/sign-up')
.get((req, res, next) => {
    res.render('auth')
})
.post(userController.register,passport.authenticate('local'),(req, res, next) => {
    res.redirect('/')
})

//*-----login
router.route('/sign-in')
.get((req, res, next) => {
    res.render('auth',{renderSearch:false})
})
.post(passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/sign-in'
    }))

router.get('/sign-out', (req, res, next) => {
    req.logOut({keepSessionInfo: true},(err) => {
        err ? next(err) : ''
    })
    res.send('User singed out')
})


//?-----Crud Routes
router.post('/create', (req, res, next) => {
    if (req.isAuthenticated()){
        next()
    }
    else{
        next(new Error('Not authanticated'))
    }
},taskContorller.createTask)

router.route('/retreive').get(taskContorller.getAll)
.post(taskContorller.getSearch)

router.get('/delete/:slug',async (req, res, next) => {
    const task = await taskModel.findOneAndDelete({slug:req.params.slug})
    res.redirect('/retreive')
})

module.exports = router


