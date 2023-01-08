import React, {useCallback, useEffect, useState} from 'react'
import Calendar from "./appointments_components/Calendar";
import Loading from "./appointments_components/Loading";
import mqttHandler from "../common_components/MqttHandler";
import {getISOWeek, isWeekend} from "date-fns";
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
    const [isLoading, setIsLoading] = useState(false);
    const [isBookingResponse, setIsBookingResponse] = useState(false)
    const [bookingResponse, setBookingResponse] = useState({})
    const [clinics, setClinics] = useState(null);
    const [currentClinic, setCurrentClinic] = useState({})
    const [yourDentistTimeslots, setYourDentistTimeslots] = useState({})
    const [toothFairyTimeslots, setToothFairyTimeslots] = useState({})
    const [theCrownTimeslots, setTheCrownTimeslots] = useState({})
    const [lisebergDentistsTimeslots, setLisebergDentistsTimeslots] = useState({})

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
                        setBookingResponse(intermediary)
                        setTimeout(() => {
                            setIsBookingResponse(true)
                            setIsLoading(false)
                        }, 2000)
                        console.log(intermediary)
                        break;
                    case client.options.clientId + '/clinics':
                        setClinics(intermediary)
                        console.log(intermediary)
                        setTimeout(() => {
                            generateTimeslotsFromOpeningHours()
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

        return () => {
            if (client !== null) {
                console.log('ending process')
                client.end()
            }
        }
    }, [client])

    /**
     * Performs generation calls and assigns results to relevant clinic
     */
    const generateTimeslotsFromOpeningHours = useCallback(() => {
        let startWeek = getISOWeek(Date.now())
        if (isWeekend(Date.now())) {
            startWeek = startWeek + 1
        }

        clinics.forEach(clinic => {
            let intermediaryTimeslots = []
            let templateWeek = generateTemplateWeek(clinic, clinic.dentists)
            for (let i = startWeek; i < (startWeek + 12); i++) {
                intermediaryTimeslots[i] = templateWeek;
            }
            let intermediaryClinic = {
                clinic: clinic,
                weeks: intermediaryTimeslots
            }
            switch (clinic.name) {
                case 'ClinicOne':
                    setLisebergDentistsTimeslots(intermediaryClinic)
                    break;
                case 'Clinic Testing':
                    removeBookedTimeslots(intermediaryTimeslots, clinic.mapStorage)
                    setToothFairyTimeslots(intermediaryClinic)
                    break;
                case 'clinic 52':
                    setTheCrownTimeslots(intermediaryClinic)
                    break;
                case 'Testing Clinic':
                    setYourDentistTimeslots(intermediaryClinic)
                    break;
                default:
                    break;
            }
        })
        
        /**
         * Based on week generation, creates objects of timeslots mapped to weekdays
         * @param clinic
         * @param dentists
         * @returns {{tuesday: *[], wednesday: *[], thursday: *[], friday: *[], monday: *[]}}
         */
        function generateTemplateWeek(clinic, dentists) {
            return {
                monday: generateWeek(clinic.openingHours.monday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                tuesday: generateWeek(clinic.openingHours.tuesday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                wednesday: generateWeek(clinic.openingHours.wednesday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                thursday: generateWeek(clinic.openingHours.thursday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists),
                friday: generateWeek(clinic.openingHours.friday, clinic.openingHours.lunchHour, clinic.openingHours.fikaHour, dentists)
            }
        }
    }, [clinics])


    /**
     * Generates arrays of timeslots based on provided opening, lunch and fika hours.
     *
     * @param openingHours
     * @param lunchHour
     * @param fikaHour
     * @param dentists
     * @returns {*[]} array of timeslots
     */
    function generateWeek(openingHours, lunchHour, fikaHour, dentists) {
        let intermediaryTimeslots = []
        let start = openingHours.start.split(":")[0]
        let end = openingHours.end.split(":")[0]
        for (let i = start; i < end; i++) {
            let hour = i.toString().padStart(2, '0')
            if (hour !== lunchHour.split(':')[0] && hour !== fikaHour.split(':')[0]) {
                intermediaryTimeslots.push({
                    time: `${hour}:00`,
                    dentists: dentists
                })
                intermediaryTimeslots.push({
                    time: `${hour}:30`,
                    dentists: dentists
                })
            }
        }
        return intermediaryTimeslots
    }

    function removeBookedTimeslots(generatedTimeslots, bookedTimeslots) {
        console.log(generatedTimeslots)
        console.log(bookedTimeslots)
    }

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
                                   onClick={() => setCurrentClinic(yourDentistTimeslots)}
                            />
                            <label className="form-check-label" htmlFor="yourDentistRadio">Your Dentist</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="toothFairyRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(toothFairyTimeslots)}
                            />
                            <label className="form-check-label" htmlFor="toothFairyRadio">Tooth Fairy</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="theCrownRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(theCrownTimeslots)}
                            />
                            <label className="form-check-label" htmlFor="theCrownRadio">The Crown</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type="radio"
                                   id="lisebergDentistRadio"
                                   name='clinicName1'
                                   onClick={() => setCurrentClinic(lisebergDentistsTimeslots)}
                            />
                            <label className="form-check-label" htmlFor="lisebergDentistRadio">Liseberg Dentist</label>
                        </div>
                    </div>
                </div>
            </div>
            <React.StrictMode>
                {isLoading ? <Loading/> : (isBookingResponse ? <BookingResponse bookingResponse={bookingResponse}/> : <Calendar clinic={currentClinic} clinicTimeslots={currentClinic} client={client}/>)}
            </React.StrictMode>
        </div>
    )
}