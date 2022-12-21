const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken");

const clinicSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
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
    address: {
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
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

clinicSchema.methods.generateToken = function () {
    return jwt.sign(this.toJSON(), 'secret_key');
}


module.exports = clinicSchema
