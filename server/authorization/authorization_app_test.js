/**
 * A class purely for testing the backend MQTT endpoints that exist within the clinic_data component.
 * Each describe and it has a description of what they do within their sting field.
 *
 * @author Burak Askan (@askan)
 */
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
                console.log('This was the expectation: ' + JSON.stringify(expectedResult) + ':::  Message is received: ' + message)

                if (topic === ("123/" + topicResponse)) {
                    if (topic !== "123/loginClient" && messageSend.body !== undefined && messageSend.body.test !== undefined) {
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
    describe('Test to see if MQTT is working.', function () {
        it('Is MQTT working?', async function () {
            this.timeout(10000)
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
        it('Testing for a successful registeration', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
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

        it('Testing registration content', async function () {
            this.timeout(10000)
            const expectedNew = {
                openingHours: {
                    monday: {start: "08:00", end: "17:00"},
                    tuesday: {start: "08:00", end: "17:00"},
                    wednesday: {start: "08:00", end: "17:00"},
                    thursday: {start: "08:00", end: "17:00"},
                    friday: {start: "08:00", end: "17:00"}
                },
                _id: "id",
                dentists: [],
                timeslots: [],
                name: "Testing Clinic",
                password: "password",
                email: "burakaskan2001@gmail.com",
                coordinates: {longitude: 11.943074635698956, latitude: 57.7057104},
                address: "Lindholmen",
                city: "Göteborg",
                __v: 0
            }
            const messageSend = {
                clientId: "123",
                body: {
                    email: "burakaskan2001@gmail.com",
                    test: "this is for the test"
                }
            }
            await asyncMethod("clinicDataRequest", "clinicData", messageSend, expectedNew)

        })
        it('Checking to see if a unsuccessful attempt is correct.', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    clinicName: "Testing Clinic",
                    address: "Lindholmen",
                    email: "burakaskan2001@gmail.com",
                    password: "Team-7"
                }
            }
            const expectedResult = {
                response: "email already exists"
            }
            await asyncMethod("registration", "register", messageSend, expectedResult)
        })
    })

    describe('login', function () {
        it('Checking to see if a successful attempt correct.', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    email: "burakaskan2001@gmail.com",
                    password: "Team-7"
                }
            }
            const expectedResult = {
                message: "login successful",
                clinicAccount: "clinic"
            }
            const messageSendClient = {
                clientId: "123",
                body: {
                    email: "burakaskan2001@gmail.com"
                }
            }
            const clinicStored = await asyncMethod("clinicDataRequest", "clinicData", messageSendClient, expectedResult)
            const result = await asyncMethod("login", "loginClient", messageSend, expectedResult)
            if (!util.isDeepStrictEqual(result.clinicAccount, clinicStored)) {
                throw new Error(JSON.stringify(result.clinicAccount) + " is not the expected message. This is: " + JSON.stringify(clinicStored)
                    + ". The listing topic in backend: " + "login" + ". The listening topic in testing: " + "123/loginClient")
            }
        })
        it('Checking to see if a unsuccessful attempt correct.', async function () {
            this.timeout(10000)
            const messageSend = {
                clientId: "123",
                body: {
                    email: "burakaskan2001@gmail.com",
                    password: "Team-7Test"
                }
            }
            const expectedResult = {
                message: "login successful",
                clinicAccount: "clinic",
                token: "token"
            }
            await asyncMethod("login", "loginClient", messageSend, expectedResult).then(r => {
                assert.equal(r.response, "Invalid email/password")
            })
        })
    })
})
//Is needed to close the tester in the CI/CD pipeline. Shouldn't be changed. Should be uncommented before going for a merge.
after(function () {
    setTimeout(() => {
        process.exit()
    }, 5000)
});