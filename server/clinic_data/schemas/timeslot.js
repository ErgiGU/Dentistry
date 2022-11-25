const mongoose = require('mongoose')
const Schema = mongoose.Schema

const timeslotSchema = new Schema({
    _id: Schema.Types.ObjectId,
    startTime: Date,
    dentist: { type: Schema.Types.ObjectId, ref: 'Dentist' }
})

module.exports = mongoose.model('Timeslot', timeslotSchema)
