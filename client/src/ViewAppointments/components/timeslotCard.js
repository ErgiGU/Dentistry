/**
 * Skeleton for displaying the timeslot specifications.
 * @author Agata Ciuchta (@ciuchta)
 */

import React from "react";
import '../ViewAppointments.css'

export default function BookedTimeslots({appointment, parentCallback}) {

    const patientName = appointment.patient.name
    const dentistName = appointment.dentist.name
    const timeslotTime = appointment.timeslot
    const text = appointment.patient.text
    return (
        <div className="cardTimeslot">
            <div className="card-body">
                <div className="row align-items-end">
                    <div className="col" id={'timeslotCardCol'}>TIME
                        <div className="text" id={'timeslotCardText'}>{timeslotTime}</div>
                    </div>
                    <div className="col" id={'timeslotCardCol'}>PATIENT
                        <div className="text" id={'timeslotCardText'}>{patientName}</div>
                    </div>
                    <div className="col" id={'timeslotCardCol'}>ADDITIONAL INFORMATION
                        <div className="text" id={'timeslotCardText'}>{text}</div>
                    </div>
                    <div className="col" id={'timeslotCardCol'}>DOCTOR
                        <div className="text" id={'timeslotCardText'}>{dentistName}</div>
                    </div>
                    <div className="col" id={'timeslotCardCol'}>
                        <button className="cancelButton" onClick={() => parentCallback(appointment.id)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
