import './ViewAppointments.css'
<<<<<<< HEAD
import React, {useEffect, useState} from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import TimeslotCard from './components/timeslotCard'
import mqttHandler from "../common_components/MqttHandler";


export default function WithHeaderExample() {

    const [client, setClient] = useState(null);
    const [appointments, setAppointments ] = useState();
// Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

// Secondary effect containing all message logic and closure state
    useEffect(() => {

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
=======
import React from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

function WithHeaderExample(props) {
    const text = "Hello"
    return (
        <div id="ty">
        <div id="background">
>>>>>>> 5400a47 (View appointments responsive design)
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
                <Timeslot appointments={appointments}/>
=======

            <MDBCol md='8'>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">DATE<div className="text">{text}</div></div>
                            <div className="col">TIME<div className="text">hello</div></div>
                            <div className="col">LOCATION<div className="text">hello</div></div>
                            <div className="col">PATIENT<div className="text">hello</div></div>
                            <div className="col">DOCTOR<div className="text">hello</div></div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
>>>>>>> 5400a47 (View appointments responsive design)
            </MDBCol>
        </MDBRow>

        </div>
        </div>
    );
}
<<<<<<< HEAD
=======

export default WithHeaderExample;
>>>>>>> 5400a47 (View appointments responsive design)
