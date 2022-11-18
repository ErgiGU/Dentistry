const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('password', passwordSchema);