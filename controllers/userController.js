//?-----
const User = require('../models/userModel')
const hash_salt = require('../lib/passwordUtils')


//?-----User routes controller
module.exports.register = async (req, res, next) => {
        const {username, email, password} = req.body
        const {hash,salt} = hash_salt.genHash(password)
        const user = await (User.create({
            username: username,
            email: email,
            salt: salt,
            hash: hash
        }))
        next()
}