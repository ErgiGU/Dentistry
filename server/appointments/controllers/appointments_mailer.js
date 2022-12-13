const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "DentistryAutomated@hotmail.com",
        pass: "Team-7Email"
    }
});

class appointments_mailer {
    sendAppointmentNotifPatient (recipient, timeslot, clinic) {
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
            html: '<nobr>You have booked a time with</nobr>' + timeslot.Dentist +
                '<nobr>. The time slot is from </nobr>' + timeslot.StartingTime +
                '<nobr> to </nobr>' + timeslot.EndingTime +
                '<nobr>. The clinic is located in </nobr>' + clinic.addressLocation +
                '<nobr>. For contacting the clinic either email: </nobr>' + clinic.addressEmail +
                '<nobr> or call: </nobr>' + clinic.phoneNumber +
                '<nobr>. Hope you have enjoyed our service and use our website again for dental bookings!<br/></nobr> <img src = "cid:toothLogo"/>',
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
    }

    sendAppointmentNotifClinic (patient, timeslot, clinic) {
        const option = {
            from: "DentistryAutomated@hotmail.com",
            to: clinic.emailAddress,
            subject: "Your Dentist Appointment",
            text: "",
            html: '<nobr>You have booked a time with</nobr>' + patient.name +
                '<nobr>. The time slot at </nobr>' + timeslot.StartingTime +
                '<nobr> with doctor </nobr>' + timeslot.dentist +
                '<nobr>. The patient describes booking cause and personal health concerns </nobr>' + patient.text +
                '<nobr>. For contacting the patient either email: </nobr>' + patient.emailAddress +
                '<nobr> or call: </nobr>' + patient.phoneNumber +
                '<nobr>. Hope you have enjoyed our service and use our website again!<br/></nobr> <img src = "cid:toothLogo"/>',
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
    }

    sendAppointmentCancelNotif (recipient, timeslot, clinic) {
        const option = {
            from: "DentistryAutomated@hotmail.com",
            to: recipient,
            subject: "Your Dentist Appointment",
            text: "",
            html: '<nobr>Your booked a time with</nobr>' + timeslot.Dentist +
                '<nobr> at </nobr>' + timeslot.StartingTime +
                '<nobr> has been canceled</nobr>' +
                '<nobr>. For contacting the clinic either email: </nobr>' + clinic.addressEmail +
                '<nobr> or call: </nobr>' + clinic.phoneNumber +
                '<nobr>. Hope you have enjoyed our service and use our website again for dental bookings!<br/></nobr> <img src = "cid:toothLogo"/>',
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
    }
}
module.exports = appointments_mailer