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
    describe('ClinicDataTests. Runs tests that checks up on every backend endpoint belonging to the clinic_data service.', function () {
        it('Is await working? We want back ToothyClinic',  async function () {
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