const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generateToken } = require('../utils/generateToken')

exports.signUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
        return res.status(400).json({ message: 'Email already exist' })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hashPassword })

    res.status(200).json({ message: 'Sign up successfully' })

})

exports.signIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: 'Invalid Credential - Email do not match' })
    }

    const verify = await bcrypt.compare(password, user.password)

    if (!verify) {
        return res.status(400).json({ message: 'Invalid - Credential - Password do not match' })
    }

    console.log(user, "userrrrrrrrrr");


    const token = generateToken({ userId: user._id })

    console.log(token, "tokennnnnnnnnn");
    res.cookie(
        "user",
        token,
        { maxAge: 900000, httpOnly: true, secure: process.env.NOD_ENV === 'production' }
    )

    res.status(200).json({
        message: 'Sign in successfully', result: {
            _id: user._id,
            email: user.email,
        }
    })

})

exports.signOut = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    return res.status(200).json({ message: 'Sign out successfully' })
})