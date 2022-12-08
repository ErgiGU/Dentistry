
const mongoose = require('mongoose');
const config = require('../../helpers/config');
const clinicSchema = require('../../helpers/schemas/clinic');

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.clinicUser.name + ':' + config.clinicUser.password + '@cluster0.lj881zv.mongodb.net/ClinicDB?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ClinicDB';

// Connect to MongoDB
const mongooseClient = mongoose.createConnection(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
})
const clinicModel = mongooseClient.model('clinic', clinicSchema);

async function editInfo (req, res){
    const email = req.body.email
    console.log(email)
    const clinic = await clinicModel.findOne({email})
    if (clinic) {
        clinic.name = req.body.name || clinic.name;
        clinic.owner = req.body.owner || clinic.owner;
        clinic.address = req.body.address || clinic.address;
        clinic.email = req.body.email || clinic.email;
        clinic.openingHours.monday.start = req.body.openingHours.monday.start || clinic.openingHours.monday.start;
        clinic.openingHours.monday.end = req.body.openingHours.monday.end || clinic.openingHours.monday.end;
        clinic.openingHours.tuesday.start = req.body.openingHours.tuesday.start || clinic.openingHours.tuesday.start;
        clinic.openingHours.tuesday.end = req.body.openingHours.tuesday.end || clinic.openingHours.tuesday.end;
        clinic.openingHours.wednesday.start = req.body.openingHours.wednesday.start || clinic.openingHours.wednesday.start;
        clinic.openingHours.wednesday.end = req.body.openingHours.wednesday.end || clinic.openingHours.wednesday.end;
        clinic.openingHours.thursday.start = req.body.openingHours.thursday.start || clinic.openingHours.thursday.start;
        clinic.openingHours.thursday.end = req.body.openingHours.thursday.end || clinic.openingHours.thursday.end;
        clinic.openingHours.friday.start = req.body.openingHours.friday.start || clinic.openingHours.friday.start;
        clinic.openingHours.friday.end = req.body.openingHours.friday.end || clinic.openingHours.friday.end;
        clinic.save();
        console.log("successfully updated")
        console.log(clinic)
        const message = {
            status: 200,
            text: 'Successfully updated!'
        }
        return JSON.stringify(message);
    } else {
        const message = {
            status: 404,
            text: 'Clinic not found!'
        }
        return JSON.stringify(message);
    }
}
async function changePassword (req, res) {
    const email = req.body.email
    console.log(email)
    const clinic = await clinicModel.findOne({email})
    console.log(clinic)
    if (clinic) {
        if(clinic.password === req.body.oldPassword) {
            clinic.password = req.body.password || clinic.password;
            clinic.save();
            console.log("password changed");
            console.log(clinic)
            const message = {
                status: 200,
                text: 'Successfully updated!'
            }
            return JSON.stringify(message);
        }
        else {
            const message = {
                status: 400,
                text: 'Old password is incorrect!'
            }
            return JSON.stringify(message);
        }
    } else {
        const message = {
            status: 404,
            text: 'Clinic not found!'
        }
       return JSON.stringify(message);
    }
}

module.exports = {editInfo, changePassword};