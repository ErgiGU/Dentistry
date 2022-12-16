const assert = require('assert')
const mqttHandler = require('../helpers/mqtt_handler');
const util = require("util");
let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

mqttClient = new mqttHandler(config.module_config.clinicUser.test.name, config.module_config.clinicUser.test.password, config.module_config.clinicUser.test.handler)
mqttClient.connect()

function asyncMethod(topicRequest, topicResponse, messageSend, expectedResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            mqttClient.subscribeTopic(topicResponse)
            mqttClient.sendMessage(topicRequest, JSON.stringify(messageSend))
            mqttClient.mqttClient.on('message', function (topic, message) {
                console.log('Message is received: ' + message + ' ::: This was the expectation: ' + JSON.stringify(expectedResult))
                if(topic === topicResponse) {
                    if(util.isDeepStrictEqual(JSON.parse(message), expectedResult) ){
                        resolve("Success");
                    }else {
                        reject(new Error(message + " is not the expected message. This is: " + JSON.stringify(expectedResult)
                        + ". The listing topic in backend: " + topicRequest + ". The listening topic in testing: " + topicResponse))
                    }
                }
            });
        }, 1000)
    })
}

describe("Tests to see if the tests are working", function () {
    //Just a test to see if I am screwing up any of the mocha testing
    describe('Simple Multiplication', function () {
        it('This is for testing purposes. Fifty times two should equal one hundred', function () {
            let result = 50 * 2;
            assert.equal(result, 100)
        })
    })

    // await attempt at async testing
    describe('A test to see if MQTT is working.', function () {
        it('Is MQTT working? We want back ToothyClinic.',  async function () {
            const messageSend = {
                hello: "Hello!"
            }
            const expectedResult = {
                additional: "WillIt",
                response: "ToothyClinic"
            }
            await asyncMethod("testingTestingRequest", "testingTesting", messageSend, expectedResult)
        })
    })
})

describe('ClinicDataTests. Runs tests that checks up on every backend endpoint belonging to the clinic_data service.', function () {
    describe('mapDataRequest', function () {
        it('Get all clinic information relating to coordinate, address, opening-hour and name.',  async function () {
            const messageSend = {
                hello: "Give Data"
            }
            const expectedResult = {
                clinics: [{
                    coordinates: [11.943074635698956, 57.7057104],
                    properties: {
                        title: "Testing Clinic",
                        address: "Address: Lindholmen",
                        opening_hours:
                            "Opening Hours: Monday: 8:00 - 17:00  Tuesday: 8:00 - 17:00  Wednesday: 8:00 - 17:00  Thursday: 8:00 - 17:00  Friday : 8:00 - 17:00"

                    }
                }]
            }
            await asyncMethod("mapDataRequest", "mapDataResponse", messageSend, expectedResult)
        })
    })

    describe('editInfo', function () {
        it('Editing the info of a given clinic',  async function () {
            const messageSend = {
                id: "123",
                body: {
                    name: "Clinic Testing",
                    owner: "Oscar Davidsson",
                    email: "burakaskan2001@gmail.com",
                }
            }
            const expectedResult = {
                status: 200,
                text: "Successfully updated!"
            }
            await asyncMethod("editInfo", "editInfoResponse", messageSend, expectedResult)
        })
        it('Checking if edits were successful',  async function () {
            const messageSend = {
                id: "123",
                body: {
                    email: "burakaskan2001@gmail.com"
                }
            }
            const expectedResult = {
                openingHours: {
                    monday: { start: '8:00', end: '17:00' },
                    tuesday: { start: '8:00', end: '17:00' },
                    wednesday: { start: '8:00', end: '17:00' },
                    thursday: { start: '8:00', end: '17:00' },
                    friday: { start: '8:00', end: '17:00' }
                },
                _id: 'id',
                name: 'Clinic Testing',
                owner: "Oscar Davidsson",
                password: 'password',
                email: 'burakaskan2001@gmail.se',
                dentists: [],
                timeslots: [],
                coordinates: {
                    longitude: 11.943074635698956,
                    latitude: 57.7057104
                },
                address: 'Lindholmen',
                city: 'Göteborg',
                __v: 0
            }

            await asyncMethod("clinicDataRequest", "clinicData", messageSend, expectedResult)
        })
    })

    describe('AddDentist', function () {
        it('See if dentist is getting added',  async function () {
            const messageSend = {
                id: "123",
                body: {
                    name: "William Bjorn",
                    email: "burakaskan2001@gmail.com",
                    phoneNumber: "073213214",
                    speciality: "Teeth"
                }
            }
            const expectedResult = {
                status: 200,
                test: "Dentist Added!"
            }
            await asyncMethod("AddDentist", "addDentistResponse", messageSend, expectedResult)
        })
        it('See if dentist was added',  async function () {
            const messageSend = {
                id: "id",
                clinic: "id",///TODO: FIX THIS
                name: "William Bjorn",
                email: "burakaskan2001@gmail.com",
                phoneNumber: "073213214",
                speciality: "Teeth"
            }
            const expectedResult = {
                status: 200,
                test: "Dentist Added!"
            }
            await asyncMethod("getDentist", "giveDentist", messageSend, expectedResult)
        })
    })

    //Is needed to close the runner in the CI/CD pipeline. Shouldn't be changed. Should be uncommented before going for a merge.
    /*describe('Closing runner', function () {
        it('Is this closing the runner?',   function () {
            mqttClient.sendMessage('test', JSON.stringify({message: 'someMsg'}))
        })
    })*/
})
//Is needed to close the tester in the CI/CD pipeline. Shouldn't be changed. Should be uncommented before going for a merge.
/*
after(function () {
    process.exit()
});*/