const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dentistSchema = new Schema({
    timeslot: [{ type: Schema.Types.ObjectId, ref: 'Timeslot' }],
    clinic: [{ type: Schema.Types.ObjectId, ref: 'Clinic' }],
    name: String,
    email: String,
    phoneNumber: String,
    lunchHour: String,
    fikaHour: String,
})

module.exports = dentistSchema
