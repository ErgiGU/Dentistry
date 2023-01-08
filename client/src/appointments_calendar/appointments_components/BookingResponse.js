import React from 'react'

export default function BookingResponse({bookingResponse}) {

    return (
        <div>
            {bookingResponse._id}<br/>
            {bookingResponse.dentist}<br/>
            {bookingResponse.patient}<br/>
            {bookingResponse.clinic}<br/>
            {bookingResponse.startTime}
        </div>
    )
}