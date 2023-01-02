const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    timeslot: { type: Schema.Types.ObjectId, ref: 'Timeslot'},
    name: String,
    email: String,
    dateOfBirth: String,
    text: String
})

module.exports = patientSchema
