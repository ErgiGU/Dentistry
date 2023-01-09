import "./Calendar.css";
import React, {useCallback, useEffect, useState} from "react";
import Timeslots from "./Timeslots";
import BookingModal from "./BookingModal";
import {getISODay, getISOWeek, getYear, isWeekend} from "date-fns";

const resolvePath = require("object-resolve-path");

export default function Calendar({clinic, clinicTimeslots, client}) {
    const [year, setYear] = useState(0);
    const [week, setWeek] = useState(0);
    const [currentDate] = useState(Date.now)
    const [currentSlot, setCurrentSlot] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [daysEnabled, setDaysEnabled] = useState([true, true, true, true, true]);
    const [mondaySlots, setMondaySlots] = useState([]);
    const [mondayDate, setMondayDate] = useState('')
    const [tuesdaySlots, setTuesdaySlots] = useState([]);
    const [tuesdayDate, setTuesdayDate] = useState('');
    const [wednesdaySlots, setWednesdaySlots] = useState([]);
    const [wednesdayDate, setWednesdayDate] = useState('');
    const [thursdaySlots, setThursdaySlots] = useState([]);
    const [thursdayDate, setThursdayDate] = useState('');
    const [fridaySlots, setFridaySlots] = useState([]);
    const [fridayDate, setFridayDate] = useState('');

    useEffect(() => {
        setYear(getYear(currentDate))
        if (isWeekend(currentDate)) {
            setWeek(getISOWeek(currentDate) + 1)
        } else {
            setWeek(getISOWeek(currentDate))
        }
    }, [currentDate])
    
    const updateDates = useCallback(() => {
        let intermediaryMondaySlots = resolvePath(clinicTimeslots, `weeks['${week}'].monday`)
        let intermediaryTuesdaySlots = resolvePath(clinicTimeslots, `weeks['${week}'].tuesday`)
        let intermediaryWednesdaySlots = resolvePath(clinicTimeslots, `weeks['${week}'].wednesday`)
        let intermediaryThursdaySlots = resolvePath(clinicTimeslots, `weeks['${week}'].thursday`)
        let intermediaryFridaySlots = resolvePath(clinicTimeslots, `weeks['${week}'].friday`)
        
        if (intermediaryMondaySlots !== undefined && intermediaryTuesdaySlots !== undefined && intermediaryWednesdaySlots !== undefined && intermediaryThursdaySlots !== undefined && intermediaryFridaySlots !== undefined) {
            setMondayDate(intermediaryMondaySlots[0])
            setTuesdayDate(intermediaryTuesdaySlots[0])
            setWednesdayDate(intermediaryWednesdaySlots[0])
            setThursdayDate(intermediaryThursdaySlots[0])
            setFridayDate(intermediaryFridaySlots[0])

            setMondaySlots(intermediaryMondaySlots)
            setTuesdaySlots(intermediaryTuesdaySlots)
            setWednesdaySlots(intermediaryWednesdaySlots)
            setThursdaySlots(intermediaryThursdaySlots)
            setFridaySlots(intermediaryFridaySlots)
        }
    }, [clinicTimeslots, week])
    
    useEffect(() => {
        updateDates()
    }, [clinic, clinicTimeslots, updateDates, week])

    /**
     * Sets the display of enabled days.
     * Prevents selecting days of current week which have already passed.
     * On weekends automatically moves week forward
     *
     * @param currentWeek
     */
    function setEnabledDays(currentWeek) {
        if (currentWeek) {
            let dayIndex = getISODay(currentDate)
            let intermediaryEnabledDays = [false, false, false, false, false]
            for (let i = dayIndex - 1; i < 5; i++) {
                intermediaryEnabledDays[i] = true;
            }
            setDaysEnabled(intermediaryEnabledDays)
        } else {
            setDaysEnabled([true, true, true, true, true])
        }
    }

    /**
     * Handles moving back and forth between weeks on calendar interface
     * min: current week, max: 12 weeks from current week
     *
     * @param add number of weeks to add
     */
    function handleWeekChange(add) {
        let realWeek = getISOWeek(currentDate);
        let intermediaryWeek = week + add
        if ((intermediaryWeek - realWeek <= 12) && (intermediaryWeek - realWeek >= 1)) {
            setWeek(intermediaryWeek)
            if (intermediaryWeek === realWeek) {
                setEnabledDays(true)
            } else {
                setEnabledDays(false)
            }
        }
        updateDates()
    }

    return (
        <div className="container">
            <div className="row">
                <div id="week" className="col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>
                                <div className={'btn'} onClick={() => handleWeekChange(-1)}>&lt;</div>
                                {year} WEEK {week}
                                <div className={'btn'} onClick={() => handleWeekChange(1)}>&gt;</div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>

                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>
                                Monday<br/>
                                {(mondayDate.date)}
                            </div>
                            {daysEnabled[0] ? <Timeslots slots={mondaySlots.slice(1)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>
                                Tuesday<br/>
                                {(tuesdayDate.date)}
                            </div>
                            {daysEnabled[1] ? <Timeslots slots={tuesdaySlots.slice(1)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>
                                Wednesday<br/>
                                {(wednesdayDate.date)}
                            </div>
                            {daysEnabled[2] ? <Timeslots slots={wednesdaySlots.slice(1)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>
                                Thursday<br/>
                                {(thursdayDate.date)}
                            </div>
                            {daysEnabled[3] ? <Timeslots slots={thursdaySlots.slice(1)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>
                                Friday<br/>
                                {(fridayDate.date)}
                            </div>
                            {daysEnabled[4] ? <Timeslots slots={fridaySlots.slice(1)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal modalShow={modalShow} slot={currentSlot} clinic={clinic} client={client}
                          onClose={() => setModalShow(false)}/>
        </div>
    )
}