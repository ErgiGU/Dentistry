import React from 'react'
import TimeslotCard from "./TimeslotCard";
import '../ViewAppointments.css'

export default function DateCard({timeslots, date, handleChildClick}) {

    return (
        <div id="cardTimeslot">
            <div className="card-body">
                <div className={'card-title text-center'} id={'timeslotDate'}>{date}</div>
                <div className={'table-responsive'}>
                    <table id={'timeslotTable'} className={'table table-sm table-bordered'}>
                        <thead>
                        <tr>
                            <th id={'timeslotCol'} scope={'col'}>TIME</th>
                            <th id={'timeslotCol'} scope={'col'}>PATIENT</th>
                            <th id={'timeslotCol'} scope={'col'}>ADDITIONAL INFORMATION</th>
                            <th id={'timeslotCol'} scope={'col'}>DOCTOR</th>
                            <th id={'timeslotCol'} scope={'col'}>CANCEL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(timeslots).map((timeslot, index) => (
                            <TimeslotCard key={index} appointment={timeslot} parentCallback={handleChildClick}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}