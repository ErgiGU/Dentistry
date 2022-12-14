const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clinicSchema = new Schema({
    dentists: [{
        type: Schema.Types.ObjectId,
        ref: 'Dentist'
    }],
    timeslots: [{
        type: Schema.Types.ObjectId,
        ref: 'Timeslot'
    }],
    name: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    owner: String,
    coordinates: {
        longitude: Number,
        latitude: Number,
    },
    address: String,
    city: String,
    openingHours: {
        monday: {
            start: { type: String, default: "8:00" },
            end: { type: String, default: "17:00" },
        },
        tuesday: {
            start: { type: String, default: "8:00" },
            end: { type: String, default: "17:00" },
        },
        wednesday: {
            start: { type: String, default: "8:00" },
            end: { type: String, default: "17:00" },
        },
        thursday: {
            start: { type: String, default: "8:00" },
            end: { type: String, default: "17:00" },
        },
        friday: {
            start: { type: String, default: "8:00" },
            end: { type: String, default: "17:00" },
        },
    }
})

module.exports = clinicSchema

