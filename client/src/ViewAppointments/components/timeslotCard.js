import React from "react";
import '../ViewAppointments.css'
export default function BookedTimeslots({appointment, parentCallback}) {

    const patientName = appointment.patient.name
    const dentistName = appointment.dentist.name
    const timeslotTime = appointment.timeslot
    const text = appointment.patient.text
    return (
    <div className="card1">
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
                <button  onClick={() => parentCallback(appointment.id)} >
                    Cancel
                </button>
            </div>
        </div>
    </div>

    )
}
