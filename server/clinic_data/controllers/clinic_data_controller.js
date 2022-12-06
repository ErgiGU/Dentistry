const mongoose = require('mongoose');
const config = require('../../helpers/config');
const clinicSchema = require('../../helpers/schemas/clinic')

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.clinicUser.name + ':' + config.clinicUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
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

function mapDataRequest() {

    let clinicMapJSON = {
        clinics: []
    }

    let clinicErrorFlag = false
    ClinicModel.find(function (err, clinics) {
        try {
            if (err) {
                return next(err);
            }
            let geoJson = {
                clinics: [
                    {
                        ruining: "ruin it all",
                        coordinates: [-77.032, 38.913],
                        properties: {
                            title: 'Mapbox',
                            description: 'Washington, D.C.'
                        }
                    },
                    {
                        ruining: "ruin it all",
                        coordinates: [11.9746, 57.7089],
                        properties: {
                            title: 'Mapbox',
                            description: 'San Francisco, California'
                        }
                    },
                    {
                        ruining: "ruin it all",
                        coordinates: [11.9746, 52.7089],
                        properties: {
                            title: 'Mapbox',
                            description: 'San Francisco, California'
                        }
                    },
                    {
                        ruining: "ruin it all",
                        coordinates: [10.9746, 57.7089],
                        properties: {
                            title: 'Mapbox',
                            description: 'San Francisco, California'
                        }
                    }
                ]
            };
            geoJson.forEach(clinic =>
                clinicMapJSON.clinics.push({
                    coordinates: clinic.coordinates,
                    properties: {
                        title: clinic.name,
                        description: clinic.address
                    },
                })
            )
        }catch(err) {
            console.log(err)
            clinicErrorFlag = true
        }
    })
    if (clinicErrorFlag) {
        return clinicMapJSON
    }else {
        return clinicErrorFlag
    }
}

const ClinicModel = mongooseClient.model('clinic', clinicSchema)

const clinicController = {
    mapDataRequest
}

module.exports = clinicController
// Model creation
//const timeSlotModel = mongooseClient.model('timeslot', timeslotSchema)