const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeslotSchema = new Schema({
    dentist: {type: Schema.Types.ObjectId, ref: 'Dentist'},
    patient: {type: Schema.Types.ObjectId, ref: 'Patient'},
    clinic: {type: Schema.Types.ObjectId, ref: 'Clinic'},
    startTime: String
})

module.exports = timeslotSchema