const nodemailer = require("nodemailer")

const sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    transport.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text: message
    }, (err) => {
        if (err) {
            console.log(err.message || "unable to send email")
            reject(err.message || "unable to send email")
        } else {
            console.log("Email send success")
            resolve("Email send success")
        }
    })
})

module.exports = sendEmail