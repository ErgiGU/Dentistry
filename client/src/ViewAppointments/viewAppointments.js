import './ViewAppointments.css'
import React, {useEffect, useState} from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import TimeslotCard from './components/timeslotCard'
import mqttHandler from "../common_components/MqttHandler";


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

// Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

// Secondary effect containing all message logic and closure state
    useEffect(() => {

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

            <MDBCol md='8'>
                {console.log(client)}
                {timeslot('6391e39a3e08ac910fbede6f', client)}
            </MDBCol>
        </MDBRow>

        </div>
        </div>
    );
}

export default WithHeaderExample;