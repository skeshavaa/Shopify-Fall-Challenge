const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    postedBy: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false
    }
})

module.exports = Image = mongoose.model('image', imageSchema)