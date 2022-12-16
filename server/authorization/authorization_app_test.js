const assert = require('assert')
const mqttHandler = require('../helpers/mqtt_handler');
const util = require('util')
let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

mqttClient = new mqttHandler(config.module_config.authorizationUser.test.name, config.module_config.authorizationUser.test.password, config.module_config.authorizationUser.test.handler)
mqttClient.connect()

function asyncMethod(topicRequest, topicResponse, messageSend, expectedResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            mqttClient.subscribeTopic("123/" + topicResponse)
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
    describe('Test to see if MQTT is working.', function () {
        it('Is MQTT working?',  async function () {
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

describe('AuthorizationTests. Runs tests that checks up on every backend endpoint belonging to the authorization service.', function () {
    describe('registeration.', function () {
        it('Testing for a successful registeration',  async function () {
            const messageSend = {
                id: "123",
                body: {
                    clinicName: "Testing Clinic",
                    address: "Lindholmen",
                    email: "burakaskan2001@gmail.com",
                    password: "Team-7"
                }
            }
            const expectedResult = {
                response: "registration successful"
            }
            await asyncMethod("registration", "register", messageSend, expectedResult)
        })

        it('Testing registration content',  async function () {
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

            await asyncMethod("clinicDataRequest", "clinicData", messageSend, expectedResult)
        })
    })
    describe('checkIfEmailExists.', function () {
        it('Checking to see if a successful attempt correct.',  async function () {
            const messageSend = {
                id: "123",
                body: {
                    email: "new@gmail.com"
                }
            }
            const expectedResult = {
                response: "email does not exist"
            }
            await asyncMethod("checkIfEmailExists", "checkMail", messageSend, expectedResult)
        })
        it('Checking to see if a unsuccessful attempt is correct.',  async function () {
            const messageSend = {
                id: "123",
                body: {
                    email: "burakaskan2001@gmail.com"
                }
            }
            const expectedResult = {
                response: "email already exists"
            }
            await asyncMethod("checkIfEmailExists", "checkMail", messageSend, expectedResult)
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