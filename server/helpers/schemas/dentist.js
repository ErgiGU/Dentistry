const mongoose = require('mongoose')
const Schema = mongoose.Schema

//remove fika time (not needed for project)
const dentistSchema = new Schema({
    clinic: { type: Schema.Types.ObjectId, ref: 'Clinic' },
    name: String,
    email: String,
    phoneNumber: String,
    timeslots: [{ type: Schema.Types.ObjectId, ref: 'Timeslot' }],
    workweek: {
        monday: {type: Boolean, default: true},
        tuesday: {type: Boolean, default: true},
        wednesday: {type: Boolean, default: true},
        thursday: {type: Boolean, default: true},
        friday: {type: Boolean, default: true}
    },
    speciality: String,
    lunchHour: String,
    fikaHour: String,
})

module.exports = dentistSchema
