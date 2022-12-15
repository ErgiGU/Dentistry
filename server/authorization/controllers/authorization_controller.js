const bcrypt = require("bcrypt");
const mongooseHandler = require('../../helpers/mongoose_handler')
const clinicSchema = require('../../helpers/schemas/clinic');
const nodeGeocoder = require('node-geocoder')
let config
try {
    config = require('../../helpers/config-server');
} catch (e) {
    config = require('../../helpers/dummy_config')
}

// Connect to MongoDB
let mongooseClient = new mongooseHandler(config.module_config.authorizationUser.mongoURI)
mongooseClient.connect().then(() => {
    createModels()
}, null)

let clinicModel

function reconnect(mongoURI) {
    mongooseClient.close()
    mongooseClient = new mongooseHandler(mongoURI)
    mongooseClient.connect().then(() => {
        createModels()
    }, null)
}

function createModels() {
    clinicModel = mongooseClient.model('clinic', clinicSchema)
}

//Checks to see if the email exists in the DB
 async function emailExists(email) {
     const clinic = await clinicModel.findOne({email:email});
        if(clinic){
            return "email already exists"
        }

 }
 //Register new clinic
 async function register(req){
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     console.log(req.body.clinicName);
     console.log(req.body.address);
     console.log(req.body.email);
     console.log(hashedPassword);
     let coordinates
     try{
         const geoData = await addressToCoordinates("Gothenburg ", req.body.address)
         coordinates = {
             longitude: geoData[0].longitude,
             latitude: geoData[0].latitude
         }
     }catch (e) {
         console.log(e)
         console.log("The address could not be found.")
     }
     const clinicAccount = new clinicModel(
        {
            name:req.body.clinicName ,
            address: req.body.address,
            email: req.body.email,
            password: hashedPassword,
            city: "Göteborg",
            coordinates: coordinates
        });
     try {
         await clinicAccount.save();
         return "success!"
     } catch (error) {
         console.error(error);
         return error;
     }
 }

 async function addressToCoordinates(city, address) {
    let options = {
        provider: 'openstreetmap'
    }

    const geoCoder = nodeGeocoder(options);

    return await geoCoder.geocode(city + address)
 }

// Authenticate a clinic
const loginClinic = async (req, res) => {
    const {email, password} = req.body

    // should find if clinic is registered
    const clinic = await clinicModel.find({email})

    if (clinic && bcrypt.compare(password, clinic.password)){
        res.json({
            name: clinic.name,
            email: clinic.email,
            password: clinic.password
        })
    } else{
        res.status(400)
    throw new Error("incorrect credentials")
}
    res.json({message:'authenticate clinic'})
}

module.exports = {
    emailExists,
    register,
    reconnect
};


