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
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean,
        friday: Boolean
    }
})

module.exports = dentistSchema
