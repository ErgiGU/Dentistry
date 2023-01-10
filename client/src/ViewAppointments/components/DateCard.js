import React from 'react'
import TimeslotCard from "./TimeslotCard";
import '../ViewAppointments.css'

export default function DateCard({timeslots, date, handleChildClick}) {

    console.log(date)
    console.log(timeslots)

    return (
        <div>
            <div id={"timeslots"}>
                <h1 id={'timeslotDate'}>{date}</h1>
                {(timeslots.timeslots).map((timeslot) => (
                    <TimeslotCard key={timeslot._id} appointment={timeslot} parentCallback={handleChildClick}/>
                ))}
            </div>
        </div>
    )
}