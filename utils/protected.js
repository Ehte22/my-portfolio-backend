const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

exports.protectedRoute = asyncHandler(async (req, res, next) => {
    console.log(req.cookies, "Cookie");

    if (!req.cookies.user) {
        return res.status(401).json({ message: 'No Cookie Found' })
    }

    jwt.verify(req.cookies.user, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: err.message || 'JWT ERROR' })
        }

        req.user = decoded
        req.body.userId = decoded.userId
        next()
    })
})