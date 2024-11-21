const { register, addUser } = require("../controllers/clientController")

const router = require("express").Router()

router
    .post("/send-email", register)

module.exports = router