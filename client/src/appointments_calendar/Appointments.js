import React, {useEffect, useState} from 'react'
import Calendar from "./appointments_components/Calendar";
import Loading from "./appointments_components/Loading";
import mqttHandler from "../common_components/MqttHandler";
import {addDays, formatISO, getISOWeek, isWeekend, nextMonday} from "date-fns";
import PatientNavbar from "../common_components/PatientNavbar";
import BookingResponse from "./appointments_components/BookingResponse";

/**
 *
 *
 * @author
 * @returns {JSX.Element}
 * @constructor
 */
export default function Appointments() {
    const [client, setClient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBookingResponse, setIsBookingResponse] = useState(false)
    const [bookingResponse, setBookingResponse] = useState({})
    const [currentClinic, setCurrentClinic] = useState({})
    const [yourDentist, setYourDentist] = useState({})
    const [toothFairy, setToothFairy] = useState({})
    const [theCrown, setTheCrown] = useState({})
    const [lisebergsDentists, setLisebergsDentists] = useState({})

    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
        setIsLoading(true)
    }, [client])

    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#')

            client.publish('getClinics', JSON.stringify(
                {
                    clientId: client.options.clientId
                }
            ))

            client.on('message', function (topic, message) {
                let intermediary = JSON.parse(message)
                switch (topic) {
                    case client.options.clientId + '/appointmentResponse':
                        console.log(intermediary)
                        setBookingResponse(intermediary)
                        setTimeout(() => {
                            setIsBookingResponse(true)
                            setIsLoading(false)
                        }, 2000)
                        break;
                    case client.options.clientId + '/clinics':
                        console.log(intermediary)
                        generateTimeslotsFromOpeningHours(intermediary)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 3000)
                        break;
                    case client.options.clientId + '/triggerLoading':
                        setIsLoading(true)
                        break;
                    default:
                        break;
                }
            })
        }

        /**
         * Performs generation calls and assigns results to relevant clinic
         */
        function generateTimeslotsFromOpeningHours(clinics) {
            let startDate = Date.now()
            let startWeek = getISOWeek(startDate)
            if (isWeekend(startDate)) {
                startDate = new Date(nextMonday(startDate))
                startWeek = startWeek + 1
            }

            clinics.forEach(clinic => {
                let intermediaryTimeslots = []
                let intermediaryDate = startDate
                for (let i = startWeek; i < (startWeek + 12); i++) {
                    intermediaryTimeslots[i] = generateWeek(intermediaryDate, clinic, clinic.dentists);
                    intermediaryDate = addDays(intermediaryDate, 7)
                }
                let intermediaryClinic = {
                    clinic: clinic,
                    weeks: intermediaryTimeslots
                }
                console.log(intermediaryClinic.clinic)
                switch (clinic.name) {
                    case 'Lisebergs Dentists':
                        removeBookedTimeslots(intermediaryTimeslots, clinic.mapStorage)
                        setLisebergsDentists(intermediaryClinic)
                        break;
                    case 'Tooth Fairy Dentist':
                        setToothFairy(intermediaryClinic)
                        break;
                    case 'The Crown':
                        setTheCrown(intermediaryClinic)
                        break;
                    case 'Your Dentist':
                        setYourDentist(intermediaryClinic)
                        break;
                    default:
                        break;
                }
            })
        }


        /**
         * Based on week generation, creates objects of timeslots mapped to weekdays
         * @param startDate
         * @param clinic
         * @param dentists
         * @returns {{tuesday: *[], wednesday: *[], thursday: *[], friday: *[], monday: *[]}}
         */
        function generateWeek(startDate, clinic, dentists) {
            return {
                monday: generateWeekday((startDate), clinic.openingHours.monday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                tuesday: generateWeekday((addDays(startDate, 1)), clinic.openingHours.tuesday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                wednesday: generateWeekday((addDays(startDate, 2)), clinic.openingHours.wednesday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                thursday: generateWeekday((addDays(startDate, 3)), clinic.openingHours.thursday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                friday: generateWeekday((addDays(startDate, 4)), clinic.openingHours.friday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists)
            }
        }

        /**
         * Generates arrays of timeslots based on provided opening, lunch and fika hours.
         *
         * @param date
         * @param openingHours
         * @param lunchHour
         * @param fikaHour
         * @param dentists
         * @returns {*[]} array of timeslots
         */
        function generateWeekday(date, openingHours, lunchHour, fikaHour, dentists) {
            let intermediaryTimeslots = []
            let start = openingHours.start.split(":")[0]
            let end = openingHours.end.split(":")[0]
            let intermediaryDate = formatISO(date, {representation: "date"})
            intermediaryTimeslots.push({
                date: intermediaryDate
            })
            for (let i = start; i < end; i++) {
                let hour = i.toString().padStart(2, '0')
                if (hour !== lunchHour.split(':')[0] && hour !== fikaHour.split(':')[0]) {
                    intermediaryTimeslots.push({
                        time: `${hour}:00`,
                        dentists: dentists,
                        date: intermediaryDate
                    })
                    intermediaryTimeslots.push({
                        time: `${hour}:30`,
                        dentists: dentists,
                        date: intermediaryDate
                    })
                }
            }
            return intermediaryTimeslots
        }

        function removeBookedTimeslots(generatedTimeslots, bookedTimeslots) {
            console.log(generatedTimeslots)
            console.log(bookedTimeslots)
        }

        return () => {
            if (client !== null) {
                console.log('ending process')
                client.end()
            }
        }
    }, [client])

    return (
        <div>
            <PatientNavbar/>
            <div className="row">
                <div id="selectClinic" className="col-lg-12 col-md-12 mb-4">
                    <div>Select Clinic</div>
                    <div className={'container'}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="yourDentistRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(yourDentist)}
                            />
                            <label className="form-check-label" htmlFor="yourDentistRadio">Your Dentist</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="toothFairyRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(toothFairy)}
                            />
                            <label className="form-check-label" htmlFor="toothFairyRadio">Tooth Fairy</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="theCrownRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(theCrown)}
                            />
                            <label className="form-check-label" htmlFor="theCrownRadio">The Crown</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="lisebergDentistRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(lisebergsDentists)}
                            />
                            <label className="form-check-label" htmlFor="lisebergDentistRadio">Liseberg Dentist</label>
                        </div>
                    </div>
                </div>
            </div>
            <React.StrictMode>
                {isLoading ? <Loading/> : (isBookingResponse ? <BookingResponse bookingResponse={bookingResponse}/> :
                    <Calendar clinic={currentClinic.clinic} clinicTimeslots={currentClinic} client={client}/>)}
            </React.StrictMode>
        </div>
    )
}