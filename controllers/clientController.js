const asyncHandler = require("express-async-handler")
const sendEmail = require("../utils/email")
const Client = require("../models/Client")



exports.register = asyncHandler(async (req, res) => {

    const { name, email, phone, message } = req.body

    await Client.create(req.body)

    const client = await sendEmail({
        to: email,
        message: `Hi ${name}, thank you for reaching out! I appreciate your message and will get back to you as soon as possible. Have a great day!`,
        subject: "Registration",
    })

    const me = await sendEmail({
        to: process.env.EMAIL,
        message: `
        Name: ${name},
        Email: ${email},
        Phone: ${phone},
        Message: ${message}
        `,
        subject: "Registration",
    })



    if (client) {
        res.status(200).json("Email send success")
    } else {
        res.status(400).json("Unable to send Email")
    }

    if (me) {
        res.status(200).json("Email send success")
    } else {
        res.status(400).json("Unable to send Email")
    }


})