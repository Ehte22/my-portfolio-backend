const jwt = require('jsonwebtoken')

exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY })
}