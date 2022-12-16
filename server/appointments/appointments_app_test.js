const assert = require('assert')
const mqttHandler = require('../helpers/mqtt_handler');
const util = require("util");
let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

mqttClient = new mqttHandler(config.module_config.appointmentUser.test.name, config.module_config.appointmentUser.test.password, config.module_config.appointmentUser.test.handler)
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
    describe('Tests to see if MQTT is working', function () {
        it('Is MQTT working? We want back ToothyClinic',  async function () {
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

describe('AppointmentTests. Runs tests that checks up on every backend endpoint belonging to the appointments service.', function () {
    describe('bookAppointment', function () {
        it('See if timeslot gets booked',  async function () {
            const messageSend = {
                clientID: "123",
                body: {
                    clinicID: "", ///TODO: These ID's have to be fixed.
                    dentistID: "",
                    patientInfo: {
                        name: "John Jane",
                        email: "burakaskan2001@gmail.com",
                        dateOfBirth: "17/08/01",
                        text: "My tooth aches"
                    },
                    timeslotTime: "9:30"
                }
            }
            const expectedResult = {
                response: "Success"
            }
            await asyncMethod("sendAppointmentInformation", "sendAppointmentInformation", messageSend, expectedResult)
        })
    })
    describe('sendAppointmentInformation', function () {
        it('See if timeslot(s) can be recieved',  async function () {
            const messageSend = {
                client_id: "123",
                body: {
                    clinicID: "XXX"///TODO: FIGURE THIS OUT
                }
            }
            const expectedResult = {
                    patient: {
                        name : "John Jane",
                        text : "My tooth aches"
                    },
                    dentist: {
                        name: "William Bjorn"
                    },
                    timeslot: "9:30"
            }
            await asyncMethod("sendAppointmentInformation", "sendAppointmentInformation", messageSend, expectedResult)
        })
    })

    describe('cancelBookedTimeslot', function () {
        it('See if timeslot is canceled',  async function () {
            const messageSend = {
                client_id: "123",
                body: {
                    timeslotID: "XXX"///TODO: FIGURE THIS OUT
                }
            }
            const expectedResult = {
                response: "Success"
            }
            await asyncMethod("cancelBookedTimeslot", "cancelBookedTimeslot", messageSend, expectedResult)
        })
        it('Check if timeslot was deleted',  async function () {
            const messageSend = {
                client_id: "123",
                body: {
                    clinicID: "XXX"///TODO: FIGURE THIS OUT
                }
            }
            const expectedResult = {
                response: "No timeslots"
            }
            await asyncMethod("sendAppointmentInformation", "sendAppointmentInformation", messageSend, expectedResult)
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