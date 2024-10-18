//?-----External Modules
const passport = require('passport')
const strategy = require('passport-local').Strategy

//?-----
const verifyPass = require('../lib/passwordUtils').hashVerify
const User = require('../models/userModel')


const verifyCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.'});
        }

        //*-----Verify the password
        const isMatch = await verifyPass(password, user.salt, user.hash);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        console.error(err); 
    }


}

passport.use(new strategy(verifyCallback))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => done(null, user))
    .catch((err) => {
        console.log(err)
        done(err)
    })
})