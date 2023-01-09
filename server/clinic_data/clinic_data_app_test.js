/**
 * A class purely for testing the backend MQTT endpoints that exist within the clinic_data component.
 * Each describe and it has a description of what they do within their sting field.
 *
 * @author Burak Askan (@askan)
 */

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
let clinicStored

/**
 * A method that sends mqtt message and listens for a response.
 * When response arrives, it compares it to the value that was expected to be response.
 * If they do not match it throws an error.
 *
 * @param topicRequest The topic that the message this method sends a message to
 * @param topicResponse The topic that the listener within this method listens to
 * @param messageSend The JSON message that is sent with the MQTT message
 * @param expectedResult The JSON value that is expected as a response
 * @returns {Promise<unknown>} Either an error or a JSON value that was received
 */
function asyncMethod(topicRequest, topicResponse, messageSend, expectedResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(topicRequest + topicResponse + messageSend)
            mqttClient.connect()
            mqttClient.subscribeTopic("123/" + topicResponse)
            mqttClient.sendMessage(topicRequest, JSON.stringify(messageSend))
            mqttClient.mqttClient.on('message', function (topic, message) {
                console.log(topic + " : is the topic of this message")
                console.log('Message is received: ' + message + ' ::: This was the expectation: ' + JSON.stringify(expectedResult))

                if (topic === ("123/" + topicResponse)) {
                    if (topic !== "123/clinicData" || messageSend.body !== undefined && messageSend.body.test !== undefined) {
                        if (!util.isDeepStrictEqual(JSON.parse(message), expectedResult)) {
                            reject(new Error(message + " is not the expected message. This is: " + JSON.stringify(expectedResult)
                                + ". The listing topic in backend: " + topicRequest + ". The listening topic in testing: " + topicResponse))
                        }
                    }
                    resolve(JSON.parse(message));
                }
            });
        }, 500)
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
    describe('A test to see if MQTT & mongoose is working', function () {
        it('We want to receive data of a clinic', async function () {
            this.timeout(10000)
            const expectedResult = {
                openingHours: {
                    monday: {start: '8:00', end: '17:00'},
                    tuesday: {start: '8:00', end: '17:00'},
                    wednesday: {start: '8:00', end: '17:00'},
                    thursday: {start: '8:00', end: '17:00'},
                    friday: {start: '8:00', end: '17:00'}
                },
                _id: 'id',
                name: 'Testing Clinic',
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
            clinicStored = await asyncMethod("clinicDataRequest", "clinicData", {
                clientId: "123",
                body: {email: "burakaskan2001@gmail.com"}
            }, expectedResult)
        })
    })
})


describe('ClinicDataTests. Runs tests that checks up on every backend MQTT endpoint belonging to the clinic_data service.', function () {
    describe('mapDataRequest', function () {
        it('Get all clinic information relating to coordinate, address, opening-hour and name.', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                hello: "Give Data"
            }
            const expectedResult = {
                clinics: [{
                    coordinates: [11.943074635698956, 57.7057104],
                    properties: {
                        title: "Testing Clinic",
                        address: "Address: Lindholmen",
                        opening_hours: "Opening Hours: Monday: 08:00 - 17:00  Tuesday: 08:00 - 17:00  Wednesday: 08:00 - 17:00  Thursday: 08:00 - 17:00  Friday : 08:00 - 17:00"
                    }
                }]
            }
            await asyncMethod("mapDataRequest", "mapDataResponse", messageSend, expectedResult)
        })
    })

    describe('editInfo', function () {
        it('Editing the info of a given clinic', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    name: "Clinic Testing",
                    owner: "Oscar Davidsson",
                    email: "burakaskan2001@gmail.com",
                    newEmail: "gusaskbu@student.gu.se",
                }
            }
            const expectedResult = {
                status: 200,
                text: "Successfully updated!"
            }
            await asyncMethod("editInfo", "editInfoResponse", messageSend, expectedResult)
        })
        it('Checking if edits were successful', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    email: "gusaskbu@student.gu.se",
                    test: "this is for the test"
                }
            }
            const newExpectedResult = {
                openingHours: {
                    monday: {start: "08:00", end: "17:00"},
                    tuesday: {start: "08:00", end: "17:00"},
                    wednesday: {start: "08:00", end: "17:00"},
                    thursday: {start: "08:00", end: "17:00"},
                    friday: {start: "08:00", end: "17:00"},
                    lunchHour:"12:00",fikaHour:"14:00"
                },
                coordinates: {
                    longitude: 11.943074635698956,
                    latitude: 57.7057104
                },
                _id: "id",
                dentists: [],
                mapStorage:{},
                name: "Clinic Testing",
                password: "password",
                email: "gusaskbu@student.gu.se",
                address: "Lindholmen",
                city: "Göteborg",
                __v: 0,
                owner: "Oscar Davidsson"
            }
            const expectedResult = {
                openingHours: {
                    monday: {start: '8:00', end: '17:00'},
                    tuesday: {start: '8:00', end: '17:00'},
                    wednesday: {start: '8:00', end: '17:00'},
                    thursday: {start: '8:00', end: '17:00'},
                    friday: {start: '8:00', end: '17:00'}
                },
                _id: clinicStored._id,
                name: 'Clinic Testing',
                owner: "Oscar Davidsson",
                password: clinicStored.password,
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

            await asyncMethod("clinicDataRequest", "clinicData", messageSend, newExpectedResult)
        })
    })


    describe('AddDentist', function () {
        it('See if dentist is getting added', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    name: "William Bjorn",
                    email: "gusaskbu@student.gu.se",
                    dentistEmail: "burakaskan2001@gmail.com",
                    phoneNumber: "0732132141",
                    speciality: "Teeth"
                }
            }
            const expectedResult = {status: 200, text: "Dentist Added!"}
            await asyncMethod("AddDentist", "addDentistResponse", messageSend, expectedResult)
        })
        it('See if dentist was added in model', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    email: "burakaskan2001@gmail.com"
                }
            }
            const expected = {
                workweek:
                    {
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true
                    },
                _id: "id",
                clinic: clinicStored._id,
                name: "William Bjorn",
                email: "burakaskan2001@gmail.com",
                phoneNumber: "0732132141",
                timeslots: [],
                __v: 0
            }
            await asyncMethod("getDentist", "giveDentist", messageSend, expected)
            clinicStored = await asyncMethod("clinicDataRequest", "clinicData", {
                clientId: "123",
                body: {email: "gusaskbu@student.gu.se"}
            }, expected)
        })
    })

    describe('Editing the dentist', function () {
        it('See if work week can get changed', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    id: clinicStored.dentists[0],
                    workweek: {
                        monday: false,
                        tuesday: true,
                        wednesday: false,
                        thursday: true,
                        friday: false
                    }
                }
            }
            const expectedResult = {
                status: 200,
                text: "Updated!"
            }
            await asyncMethod("setDentistSchedule", "setDentistScheduleResponse", messageSend, expectedResult)
        })

        it('See if dentist general information is getting changed', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    id: clinicStored.dentists[0],
                    name: "Solomon Mathews",
                    phonenumber: "0769136300"
                }
            }
            const expectedResult = {
                status: 200,
                text: "Updated!"
            }
            await asyncMethod("editDentistInfo", "editDentistInfoResponse", messageSend, expectedResult)
        })

        it('See if dentist is getting received correctly', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    clinicId: clinicStored._id
                }
            }
            const resultExpectation = {
                dentists: [{
                    id: clinicStored.dentists[0],
                    name: "Solomon Mathews",
                    email: "burakaskan2001@gmail.com",
                    phoneNumber: "0769136300",
                    workWeek: {
                        monday: false,
                        tuesday: true,
                        wednesday: false,
                        thursday: true,
                        friday: false
                    }
                }]
            }
            await asyncMethod("getDentists", "getDentistsResponse", messageSend, resultExpectation)
        })
    })
})
//Is needed to close the tester in the CI/CD pipeline. Shouldn't be changed. Should be uncommented before going for a merge.

after(function () {
    setTimeout(() => {
        process.exit()
    }, 5000)
});