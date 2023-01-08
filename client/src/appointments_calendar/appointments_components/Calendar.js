import "./Calendar.css";
import React, {useEffect, useState} from "react";
import Timeslots from "./Timeslots";
import BookingModal from "./BookingModal";
import {getISODay, getISOWeek, getYear, isWeekend} from "date-fns";

const resolvePath = require("object-resolve-path");

export default function Calendar({clinic, client}) {
    const [year, setYear] = useState(0);
    const [week, setWeek] = useState(0);
    const [currentDate] = useState(Date.now)
    const [currentSlot, setCurrentSlot] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [daysEnabled, setDaysEnabled] = useState([true, true, true, true, true]);

    useEffect(() => {
        setYear(getYear(currentDate))
        if (isWeekend(currentDate)) {
            setWeek(getISOWeek(currentDate) + 1)
        } else {
            setWeek(getISOWeek(currentDate))
        }
    }, [currentDate])

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
                                Monday
                            </div>
                            {daysEnabled[0] ? <Timeslots slots={resolvePath(clinic, `weeks['${week}'].monday`)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>Tuesday</div>
                            {daysEnabled[1] ? <Timeslots slots={resolvePath(clinic, `weeks['${week}'].tuesday`)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>Wednesday</div>
                            {daysEnabled[2] ? <Timeslots slots={resolvePath(clinic, `weeks['${week}'].wednesday`)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>Thursday</div>
                            {daysEnabled[3] ? <Timeslots slots={resolvePath(clinic, `weeks['${week}'].thursday`)}
                                                         setCurrentSlot={setCurrentSlot}
                                                         setModalShow={setModalShow}/> : null}
                        </div>
                    </div>
                </div>
                <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'card-title'}>Friday</div>
                            {daysEnabled[4] ? <Timeslots slots={resolvePath(clinic, `weeks['${week}'].friday`)}
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