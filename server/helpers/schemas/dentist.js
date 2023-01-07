const mongoose = require('mongoose')
const Schema = mongoose.Schema

//remove fika time (not needed for project)
const dentistSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    timeslot: [{ type: Schema.Types.ObjectId, ref: 'Timeslot' }],
    clinic: { type: Schema.Types.ObjectId, ref: 'Clinic' },
    workweek: {
        monday: {type: Boolean, default: true},
        tuesday: {type: Boolean, default: true},
        wednesday: {type: Boolean, default: true},
        thursday: {type: Boolean, default: true},
        friday: {type: Boolean, default: true}
    }
})

module.exports = dentistSchema
