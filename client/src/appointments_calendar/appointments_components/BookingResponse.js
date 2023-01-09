import React from 'react'

export default function BookingResponse({bookingResponse}) {

    return (
        <div className={'container-lg table-responsive-lg'}>
            <h1>Your booking</h1>
            <table className={'table table-bordered'}>
                <thead>
                    <th scope={'col'}>Clinic</th>
                    <th scope={'col'}>Appointment time</th>
                    <th scope={'col'}>Dentist</th>
                    <th scope={'col'}>Location</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{bookingResponse.clinic.name}</td>
                        <td>{bookingResponse.startTime}</td>
                        <td>{bookingResponse.dentist.name}</td>
                        <td>{bookingResponse.clinic.address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}