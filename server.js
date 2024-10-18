require('dotenv').config()
require('./config/dbConfig')()
require('./config/passportConfig')

//?-----External Modules
const express = require('express')
const session = require('express-session')
const ejsLayouts = require('express-ejs-layouts')
const mongoStore = require('connect-mongo')
const passport = require('passport')

//?-----
const routes = require('./routes/index')

//?-----Express APP
const app = express()


//?-----Global Middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static('public'))

app.use(ejsLayouts)
app.set('view engine', 'ejs')
app.set('views', require('path').join(__dirname, 'views'))
app.set('layout','./layouts/main')

//* Express Session Middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.DB_STRING,
        collectionName: 'session-store'
    }),
    cookie:{
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        rolling: true
    }
}))

//?-----Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//?-----Routes
app.use(routes)

//?-----Error Handling Middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.status || 500).render('error')
})

//?-----Listening
app.listen(process.env.PORT || 5000, () => {
    console.log('Listening')
})


