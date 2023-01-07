const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken");

const clinicSchema = new Schema({
    dentists: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Dentist'
    }],
    mapStorage: {
        type: Map,
        required: true,
        of: new Schema({
            timeslots: [{
                type: Schema.Types.ObjectId,
                unique: true,
                ref: 'Timeslot'
            }]
        })
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    owner: String,
    coordinates: {
        longitude: Number,
        latitude: Number,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    openingHours: {
        monday: {
            start: {type: String, default: "08:00"},
            end: {type: String, default: "17:00"}
        },
        tuesday: {
            start: {type: String, default: "08:00"},
            end: {type: String, default: "17:00"}
        },
        wednesday: {
            start: {type: String, default: "08:00"},
            end: {type: String, default: "17:00"}
        },
        thursday: {
            start: {type: String, default: "08:00"},
            end: {type: String, default: "17:00"}
        },
        friday: {
            start: {type: String, default: "08:00"},
            end: {type: String, default: "17:00"}
        },
    },
    lunchHour: {
        type: String,
        default: "12:00"
    },
    fikaHour: {
        type: String,
        default: "14:00"
    }
})

clinicSchema.methods.generateToken = function () {
    return jwt.sign(this.toJSON(), 'secret_key');
}

module.exports = clinicSchema