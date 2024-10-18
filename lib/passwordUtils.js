//?-----External Modules
const crypto = require('crypto')


//?-----Hash and Salt Setup
module.exports.genHash = (password) => {
    salt = crypto.randomBytes(64).toString('hex')
    hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')

    return {salt, hash}
}

module.exports.hashVerify = (password, salt, hash) => {
    const passHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
    return passHash === hash
}