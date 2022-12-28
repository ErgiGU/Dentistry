import './ViewAppointments.css'
import React, {useEffect, useState} from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import TimeslotCard from './components/timeslotCard'
import mqttHandler from "../common_components/MqttHandler";


<<<<<<< HEAD
function asyncMethod(client,clinic) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (client !== null) {
                client.subscribe(client.options.clientId + '/#')
                client.publish('sendAppointmentInformation', JSON.stringify({
                    id: client.options.clientId,
                    body: {
                       clinicID : clinic
                    }
                }))
                client.on('message', function (topic, message) {
                    switch (topic) {
                        case client.options.clientId + '/sendAppointmentInformation':
                            resolve(JSON.parse(message))
                            break;
                        default:
                            reject(new Error("The wrong message is received"))
                            break;
                    }
                })
            }
        }, 1000)
    })
}

async function waitTimeslot(clinic,client) {
    return await asyncMethod(client,clinic)
}

const timeslot =  async (clinic, client) => {
    const appointments = await waitTimeslot(clinic, client)
    return (
        <div>
            {appointments.timeslots.map(({patient, dentist, timeslot}) => (
            <div>
                <TimeslotCard patientName = {patient.name} timeslotStarttime = {timeslot.startTime} patientText = {patient.text} dentistName = {dentist.name}/>
            </div>
            ))}
        </div>
    );
};


function WithHeaderExample() {

    const [client, setClient] = useState(null);

=======
export default function WithHeaderExample() {

    const [client, setClient] = useState(null);
    const [appointments, setAppointments ] = useState();
>>>>>>> origin/ClinicHomePage
// Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

// Secondary effect containing all message logic and closure state
    useEffect(() => {

<<<<<<< HEAD
        return () => {
            if (client !== null) {
                console.log('ending process')
                client.end()
            }
        }
    }, [client])

    return (
        <div id="ty">
        <div id="background">
=======
            if (client !== null) {
                client.subscribe(client.options.clientId + '/#')

                client.on('message', function (topic, message) {
                    switch (topic) {
                        case client.options.clientId + '/sendAppointmentInformation':
                            setAppointments(JSON.parse(message).timeslots)
                            break;
                        default:
                            (new Error("The wrong message is received"))
                            break;
                    }
                })
            }
            return () => {

                if (client !== null) {
                    console.log("ending process");
                    client.end()
                }
            }
    }, [client])

   function sendAppointmentInformation(clinic){
        if(!client){
            return null
        }
        client.publish('sendAppointmentInformation', JSON.stringify({
            id: client.options.clientId,
            body: {
                clinicID : clinic
            }
        }))
       return null
    }
    function Timeslot({appointments}) {
        if(!appointments || appointments.length === 0){
            return null
        }
        return (
            <div>
                {appointments.timeslots.map(({patient, dentist, timeslot}) => (
                    <div>
                        <TimeslotCard patientName = {patient.name} timeslotStarttime = {timeslot.startTime} patientText = {patient.text} dentistName = {dentist.name}/>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div id="ty">
        <div id="background">
            <div className="btn btn-primary" onClick={sendAppointmentInformation("6391e39a3e08ac910fbede6f")}>Refresh </div>
>>>>>>> origin/ClinicHomePage
        <MDBRow>
            <MDBCol md='3'>
                <div className="card" >
                    <div className="card-body">
                        <img className="clinic" src="https://cdn-icons-png.flaticon.com/512/2317/2317964.png" alt="clinic" />
                    </div>
                    <div className="card-body">
                        <button type="button" className="btn">LOG OUT</button>
                    </div>
                </div>
            </MDBCol>
<<<<<<< HEAD

            <MDBCol md='8'>
                {console.log(client)}
                {timeslot('6391e39a3e08ac910fbede6f', client)}
=======
            <MDBCol md='8'>
                <Timeslot appointments={appointments}/>
>>>>>>> origin/ClinicHomePage
            </MDBCol>
        </MDBRow>

        </div>
        </div>
    );
}
<<<<<<< HEAD

export default WithHeaderExample;
=======
>>>>>>> origin/ClinicHomePage
