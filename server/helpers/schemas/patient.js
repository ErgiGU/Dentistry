const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    timeslots: [{
        type: Schema.Types.ObjectId, ref: 'Timeslot'
    }],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dateOfBirth: {
        type: String
    },
    text: {
        type: String
    }
})

module.exports = patientSchema
