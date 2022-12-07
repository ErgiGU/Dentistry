const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clinicSchema = new Schema({
    name: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    owner: String,
    dentists: [{ type: Schema.Types.ObjectId, ref: 'Dentist' }],
    timeslots: [{ type: Schema.Types.ObjectId, ref: 'Timeslot' }],
    coordinates: {
        longitude: Number,
        latitude: Number,
    },
    address: String,
    city: String,
    openingHours: {
        monday: { type: String, default: "8:00-17:00" },
        tuesday: {type: String, default: "8:00-17:00"} ,
        wednesday: { type: String, default: "8:00-17:00" },
        thursday: { type: String, default: "8:00-17:00" },
        friday: { type: String, default: "8:00-17:00" },
    }
})

module.exports = clinicSchema
