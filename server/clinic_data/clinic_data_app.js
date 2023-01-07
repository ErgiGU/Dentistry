/**
 * All mqtt related operations for the clinic_data component are done here
 * @author Burak Askan (@askan)
 * @Author Aieh Eissa (@aieh)
 */
const mqttHandler = require('../helpers/mqtt_handler');
const clinic_data_controller = require('./controllers/clinic_data_controller.js');
const clinicData = require('./controllers/clinic_data_controller.js');


let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

// MQTT Client
const mqttClient = new mqttHandler(config.module_config.clinicUser.name, config.module_config.clinicUser.password, config.module_config.clinicUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('initiateTesting')
mqttClient.subscribeTopic('mapDataRequest')
mqttClient.subscribeTopic('testingTestingRequest')
mqttClient.subscribeTopic('clinicDataRequest')
mqttClient.subscribeTopic('wipeTestData')
mqttClient.subscribeTopic('editInfo')
mqttClient.subscribeTopic('getDentist')
mqttClient.subscribeTopic('changePassword')
mqttClient.subscribeTopic('AddDentist')
mqttClient.subscribeTopic('getCurrentLoggedInClinic')
mqttClient.subscribeTopic('getClinics')

// When a message arrives, respond to it or propagate it further
try {
    /**
     * The MQTT listener that receives incoming messages and sends back messages after data manipulation.
     */
    mqttClient.mqttClient.on('message', async function (topic, message) {
        let intermediary = JSON.parse(message)
        console.log(config.module_config.clinicUser.handler + " service received MQTT message")
        console.log(intermediary);

        switch (topic) {
            case 'firstTest':
                mqttClient.sendMessage('testAppointment', 'Testing callback')
                break;
            case 'mapDataRequest':
                const body = await clinic_data_controller.mapDataRequest()
                console.log(body)
                mqttClient.sendMessage(intermediary.clientId + '/mapDataResponse', JSON.stringify(body))
                break;
            case 'clinicDataRequest':
                let clinic = await clinic_data_controller.clinicData(intermediary.body.email)
                if (intermediary.body.test) {
                    clinic = JSON.stringify(clinic)
                    clinic = JSON.parse(clinic)
                    clinic._id = "id"
                    clinic.password = "password"
                }
                mqttClient.sendMessage(intermediary.clientId + '/clinicData', JSON.stringify(clinic))
                break;
            case 'editInfo':
                clinicData.editInfo(intermediary).then(res => {
                    mqttClient.sendMessage(intermediary.clientId + '/editInfoResponse', res)
                })
                break;
            case 'changePassword':
                clinicData.changePassword(intermediary).then(res => {
                    mqttClient.sendMessage(intermediary.clientId + '/changePasswordResponse', res)
                })
                break;
            case 'getDentist':
                let dentist = await clinic_data_controller.getDentist(intermediary.body.email)
                dentist = JSON.stringify(dentist)
                dentist = JSON.parse(dentist)
                dentist._id = "id"
                mqttClient.sendMessage(intermediary.clientId + '/giveDentist', JSON.stringify(dentist))
                break;
            case 'testingTestingRequest':
                const messageSending = {
                    response: "ToothyClinic",
                    additional: "WillIt"
                }
                mqttClient.sendMessage('123/testingTesting', JSON.stringify(messageSending))
                break;
            case 'test':
                process.exit()
                break;
            case 'initiateTesting':
                clinic_data_controller.reconnect(config.admin_config.database_tester.mongoURI)
                break;
            //THIS ENDPOINT SHOULD ONLY BE USED TO WIPE THE DATABASE
            case 'wipeTestData':
                console.log("Entered")
                let response = await clinic_data_controller.removeData()
                mqttClient.sendMessage('123/wipeTestData', JSON.stringify(response))
                break;
            case 'getClinics':
                let clinics = await clinic_data_controller.getClinics()
                mqttClient.sendMessage(intermediary.clientId + '/clinics', JSON.stringify(clinics))
                break
            case 'AddDentist':
                clinicData.addDentist(intermediary).then(res => {
                    mqttClient.sendMessage(intermediary.clientId + '/addDentistResponse', res)
                })
                break;
            case 'getCurrentLoggedInClinic':
                clinicData.getCurrentClinic(intermediary).then(res => {
                    mqttClient.sendMessage(intermediary.clientId + '/currentLoggedInClinicResponse', res)
                })
                break;
        }
    });
} catch (e) {
    console.log(e)
    console.log("Message was received but caused a crash.")
}
module.exports = mqttClient;