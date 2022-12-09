const assert = require('assert')
const mqttHandler = require('../helpers/mqtt_handler');
let config
try {
    config = require('../helpers/config');
} catch (e) {
    config = require('../helpers/dummy_config')
}

mqttClient = new mqttHandler(config.module_config.appointmentUser.test.name, config.module_config.appointmentUser.test.password, config.module_config.appointmentUser.test.handler)
mqttClient.connect()
mqttClient.subscribeTopic('testingTesting')

function asyncMethod() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            mqttClient.sendMessage('testingTestingRequest', JSON.stringify({message: 'someMsg'}))
            mqttClient.mqttClient.on('message', function (topic, message) {
                console.log('Message is recieved: ' + message)
                if(topic === 'testingTesting') {
                    if((message + "") === 'ToothyClinic'){
                        resolve('success');
                    }else {
                        reject(new Error(message + " is not the expected message"))
                    }
                }
            });
        }, 1000)
    })
}

describe('AppointmentsTests', function () {
    describe('Multiplication', function () {
        it('This is for testing purposes. Fifty times two should equal one hundred', function () {
            var result = 50 * 2
            assert.equal(result, 100)
        })
    })

    // working done async checker
    /*describe('ToothyClinic', function () {
        try{
            it('Is toothy being given back to us?',  function (done) {
                mqttClient.sendMessage('testingTestingRequest', 'somethingelse?')
                mqttClient.mqttClient.on('message', function (topic, message) {
                    switch (topic) {
                        case 'testingTesting':
                            if(message + "" === 'ToothyClinic'){
                                done()
                            }
                            break;
                    }
                });

            })
        }catch (err) {
            console.log("There was a error")
        }

    })*/

    // await attempt at async testing
    describe('ToothyClinicAwait', function () {
        it('Is await working?',  async function () {
            await asyncMethod()
        })
    })
    describe('lastThing', function () {
        it('Is this last thing activating?',   function () {
            assert.equal(1,1)
        })
    })
    describe('Closing Runner', function () {
        it('Is this closing the runner?',   function () {
            mqttClient.sendMessage('test', JSON.stringify({message: 'someMsg'}))
        })
    })
})
after(function () {
    process.exit()
});