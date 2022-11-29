const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentistSchema = new Schema({
    lunchHour: String,
    fikaHour: String
})

module.exports = dentistSchema
