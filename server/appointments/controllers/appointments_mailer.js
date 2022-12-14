const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "DentistryAutomated@hotmail.com",
        pass: "Team-7Email"
    }
});

class appointments_mailer {
    async sendAppointmentNotifPatient (recipient, timeslot, clinic, dentist) {
        try{
            const option = {
                from: "DentistryAutomated@hotmail.com",
                to: recipient,
                subject: "Your Dentist Appointment",
                text: "You have booked a 30 minutes timeslot with "
                    + dentist.name +
                    ". The appointment starts at "
                    + timeslot
                    + ". The clinic is located in "
                    + clinic.address + ". "
                    + "For contacting the clinic directly please email: " + clinic.email
                    + ". Hope you have enjoyed our service and use our website again for dental bookings!",
                html: '<nobr>You have booked a 30 minutes timeslot with </nobr>' + dentist.name +
                    '<nobr>. The appointment starts at </nobr>' + timeslot +
                    '<nobr>. The clinic is located in </nobr>' + clinic.address +
                    '<nobr>. For contacting the clinic directly please email: </nobr>' + clinic.email +
                    '<nobr>. Hope you have enjoyed our service and use our website again for dental bookings!<br/></nobr> <img src = "cid:toothLogo"/>',
                attachments: [
                    {
                        filename: 'toothLogo.png',
                        path:'./controllers/toothLogo.png',
                        cid: 'toothLogo'
                    }
                ]
            }
            transporter.sendMail(option, async function(err, info) {
                if (err) {
                    console.log('Email could not be sent.')
                    console.log(err)
                    return "Failed";
                }
                console.log("Sent: " + info.response)
            })
        }catch (e) {
            console.log("Failed to send email to patient")
            console.log(e)
            return "Failed"
        }
    }

    async sendAppointmentNotifClinic (patient, timeslot, clinic, dentist) {
        try {
            const option = {
                from: "DentistryAutomated@hotmail.com",
                to: clinic,
                subject: "Your Dentist Appointment",
                text: "",
                html: '<nobr>You have booked a time with </nobr>' + patient.name +
                    '<nobr>. The time slot at </nobr>' + timeslot +
                    '<nobr> with doctor </nobr>' + dentist.name +
                    '<nobr>. The patient describes booking cause and personal health concerns as the following:  "</nobr>' + patient.text +
                    '<nobr>". For contacting the patient directly please email: </nobr>' + patient.email +
                    '<nobr>. Hope you have enjoyed our service and use our website again!<br/></nobr> <img src = "cid:toothLogo"/>',
                attachments: [
                    {
                        filename: 'toothLogo.png',
                        path:'./controllers/toothLogo.png',
                        cid: 'toothLogo'
                    }
                ]
            }
            transporter.sendMail(option, async function(err, info) {
                if (err) {
                    console.log('Email could not be sent.')
                    console.log(err)
                    return "Failed";
                }
                console.log("Sent: " + info.response)
            })
        } catch (e) {
            console.log("Failed to send email to clinic")
            console.log(e)
            return "Failed"
        }
    }

    sendAppointmentCancelNotif (recipient, timeslot, clinic, dentist) {
        try {
            const option = {
                from: "DentistryAutomated@hotmail.com",
                to: recipient,
                subject: "Your Dentist Appointment",
                text: "",
                html: '<nobr>Your booked time with </nobr>' + dentist.name +
                    '<nobr> at </nobr>' + timeslot +
                    '<nobr> has been canceled by the clinic</nobr>' +
                    '<nobr>. For contacting the clinic please directly email: </nobr>' + clinic.email +
                    '<nobr>. Hope you have enjoyed our service and use our website again for dental bookings!<br/></nobr> <img src = "cid:toothLogo"/>',
                attachments: [
                    {
                        filename: 'toothLogo.png',
                        path:'./controllers/toothLogo.png',
                        cid: 'toothLogo'
                    }
                ]
            }
            transporter.sendMail(option, async function(err, info) {
                if (err) {
                    console.log('Email could not be sent.')
                    console.log(err)
                    return "Failed";
                }
                console.log("Sent: " + info.response)
            })
        } catch (e) {
            console.log("Failed to send cancelation mail to patient")
            console.log(e)
            return "Failed"
        }
    }
}
module.exports = appointments_mailer