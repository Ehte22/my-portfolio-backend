const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
const cookieParser = require('cookie-parser')
const { protectedRoute } = require("./utils/protected")


const app = express()


const corsOptions = {
    // origin: 'http://localhost:3000',
    // origin: "https://my-portfolio-ashen-seven-27.vercel.app",
    origin: (origin, callback) => {
        // Allow requests with no origin, like mobile apps or curl requests

        if (!origin) return callback(null, true);
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/api/client", require("./routes/clientRouter"))
app.use("/api/user", require("./routes/userRouter"))
app.use("/api/admin", require("./routes/adminRouter"))

app.use('*', (req, res, next) => {
    return res.status(404).json({ message: 'Resource Not Found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("DB CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))


})
