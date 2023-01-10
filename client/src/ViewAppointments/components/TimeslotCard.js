/**
 * Skeleton for displaying the timeslot specifications.
 * @author Agata Ciuchta (@ciuchta)
 */

import React from "react";
import '../ViewAppointments.css'

export default function TimeslotCard({appointment, parentCallback}) {

    return (
        <tr>
            <td id={'timeslotCardText'} style={{width:"100px"}}>{appointment.timeslot}</td>
            <td id={'timeslotCardText'} style={{width:"250px"}}>{appointment.patient.name}</td>
            <td id={'timeslotCardText'} style={{width:"400px"}}>{appointment.patient.text}</td>
            <td id={'timeslotCardText'} style={{width:"250px"}}>{appointment.dentist.name}</td>
            <td>
                <button className={'btn'} id="cancelButton" onClick={() => parentCallback(appointment.id)}>
                    Cancel
                </button>
            </td>
        </tr>
    )
}
