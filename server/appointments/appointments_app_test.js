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
let clinicStored

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

                if(topic === ("123/" + topicResponse)) {
                    resolve(JSON.parse(message));
                    if(!util.isDeepStrictEqual(JSON.parse(message), expectedResult) ){
                        reject(new Error(message + " is not the expected message. This is: " + JSON.stringify(expectedResult)
                            + ". The listing topic in backend: " + topicRequest + ". The listening topic in testing: " + topicResponse))
                    }
                }
            });
        }, 100)
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
            this.timeout(10000)
            const expectedResult = {openingHours:{monday:{start:"8:00",end:"17:00"},tuesday:{start:"8:00",end:"17:00"},wednesday:{start:"8:00",end:"17:00"},thursday:{start:"8:00",end:"17:00"},friday:{start:"8:00",end:"17:00"}},_id:"639f999b75948aaabf80d80f",dentists:[],timeslots:["63a1a393e2743de0e3b4845c"],name:"Testing Clinic",password:"$2b$10$WnpIf0U4aaTn9x2dHFUnvu4MdpVuHdzQr.eyMIPsxJ96Mx/risOuy",email:"burakaskan2001@gmail.com",address:"Lindholmen",city:"Göteborg",__v:1}
            clinicStored = await asyncMethod("clinicDataRequest", "clinicData", {id: "123", body: {email: "burakaskan2001@gmail.com"}}, expectedResult)

        })
    })
})

describe('AppointmentTests. Runs tests that checks up on every backend endpoint belonging to the appointments service.', function () {
    describe('bookAppointment', function () {
        it('See if timeslot gets booked',  async function () {
            this.timeout(10000)
            const messageSend = {
                client_id: "123",
                body: {
                    clinicID: clinicStored._id,
                    //dentistID: clinicStored.dentists[0],
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
            await asyncMethod("bookTimeslot", "bookTimeslot", messageSend, expectedResult)
        })
    })
    describe('sendAppointmentInformation', function () {
        it('See if timeslot(s) can be recieved',  async function () {
            this.timeout(10000)
            const messageSend = {
                client_id: "123",
                body: {
                    clinicID: clinicStored._id
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
            this.timeout(10000)
            const fetchClinicExpectation = {openingHours:{monday:{start:"8:00",end:"17:00"},tuesday:{start:"8:00",end:"17:00"},wednesday:{start:"8:00",end:"17:00"},thursday:{start:"8:00",end:"17:00"},friday:{start:"8:00",end:"17:00"}},_id:"639f999b75948aaabf80d80f",dentists:[],timeslots:[],name:"Testing Clinic",password:"$2b$10$WnpIf0U4aaTn9x2dHFUnvu4MdpVuHdzQr.eyMIPsxJ96Mx/risOuy",email:"burakaskan2001@gmail.com",address:"Lindholmen",city:"Göteborg",__v:0}
            clinicStored = await asyncMethod("clinicDataRequest", "clinicData", {id: "123", body: {email: "burakaskan2001@gmail.com"}}, fetchClinicExpectation)
            console.log(clinicStored)
            const messageSend = {
                client_id: "123",
                body: {
                    timeslotID: clinicStored.timeslots[0]
                }
            }
            const expectedResult = {
                response: "Success"
            }
            await asyncMethod("cancelBookedTimeslot", "cancelBookedTimeslot", messageSend, expectedResult)
        })
        it('Check if timeslot was deleted',  async function () {
            this.timeout(10000)
            const messageSend = {
                client_id: "123",
                body: {
                    clinicID: clinicStored._id
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