const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "DentistryAutomated@hotmail.com",
        pass: "Team-7Email"
    }
});

//Dummy test data

const recipient = "burakaskan2001@gmail.com"
const timeslot = {
    Dentist: "john",
    StartingTime: "01",
    EndingTime: "02"
}
const clinic = {
    addressLocation: "rando",
    addressEmail: "somegmail",
    phoneNumber: "072312"
}


const option = {
    from: "DentistryAutomated@hotmail.com",
    to: recipient,
    subject: "Your Dentist Appointment",
    text: "You have booked a time with "
        + timeslot.Dentist +
        ". The time slot is from "
        + timeslot.StartingTime
        + " to " + timeslot.EndingTime
        + ". The clinic is located in "
        + clinic.addressLocation + ". "
        + "For contacting the clinic either email: " + clinic.addressEmail
        + " or call: " + clinic.phoneNumber
        + ". Hope you have enjoyed our service and use our website again for dental bookings!",
    html: '<b>You have booked a time with timeslot.Dentist </b><img src = "cid:toothLogo"/>',
    attachments: [
        {
            filename: 'toothLogo.png',
            path:'./toothLogo.png',
            cid: 'toothLogo'
        }
    ]
}

transporter.sendMail(option, async function(err, info) {
    if (err) {
        console.log('Email could not be sent.')
        console.log(err)
        return;
    }
    console.log("Sent: " + info.response)
})

function sendAppointmentMail (recipient, timeslot, clinic) {

}