import React from "react";
import '../ViewAppointments.css'
export default function BookedTimeslots(props) {

    const patientName = props.patientName
    const dentistName = props.dentistName
    const timeslotTime = props.timeslotStarttime
    const text = props.patient.text
    return (
    <div key={patientName + dentistName + timeslotTime} className="card1">
        <div className="card-body">
            <div className="row align-items-end">
                <div className="col">TIME
                    <div className="text">{timeslotTime}</div>
                </div>
                <div className="col">PATIENT
                    <div className="text">{patientName}</div>
                </div>
                <div className="col">ADDITIONAL INFORMATION
                    <div className="text">{text}</div>
                </div>
                <div className="col">DOCTOR
                    <div className="text">{dentistName}</div>
                </div>
            </div>
        </div>
    </div>

    )
}
