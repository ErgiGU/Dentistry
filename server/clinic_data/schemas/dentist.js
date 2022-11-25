const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentistSchema = new Schema({
    _id: Schema.Types.ObjectId,
    lunchHour: String,
    fikaHour: String
})

module.exports = mongoose.model('Dentist', dentistSchema)
