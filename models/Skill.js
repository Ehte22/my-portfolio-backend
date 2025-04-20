const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    percentage: {
        type: String,
    },
})

module.exports = mongoose.model('skill', skillSchema)