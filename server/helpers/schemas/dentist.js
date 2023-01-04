const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentistSchema = new Schema({
    clinic: { type: Schema.Types.ObjectId, ref: 'Clinic' },
    name: String,
    email: String,
    phoneNumber: String,
    speciality: String,
    lunchHour: String,
    fikaHour: String,
})

module.exports = dentistSchema
