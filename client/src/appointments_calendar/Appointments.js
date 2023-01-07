import React, {useEffect, useState} from 'react'
import Calendar from "./appointments_components/Calendar";
import Loading from "./appointments_components/Loading";
import mqttHandler from "../common_components/MqttHandler";
import {getISOWeek, isWeekend} from "date-fns";
import PatientNavbar from "../common_components/PatientNavbar";

export default function Appointments() {

    const [client, setClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
                        console.log(intermediary)
                        break;
                    case client.options.clientId + '/clinics':
                        setClinics(intermediary)
                        console.log(intermediary)
                        setIsLoading(false)
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

    function generateTimeslotsFromOpeningHours() {
        let startWeek = getISOWeek(Date.now())
        if (isWeekend(Date.now())) {
            console.log('is weekend')
            startWeek = startWeek + 1
        }

        clinics.forEach(clinic => {
            let intermediaryTimeslots = {}
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
                    setToothFairyTimeslots(intermediaryClinic)
                    break;
                case 'clinic 52':
                    setTheCrownTimeslots(intermediaryClinic)
                    break;
                case 'OssianDentists':
                    setYourDentistTimeslots(intermediaryClinic)
                    break;
                default:
                    break;
            }
        })
    }

    function generateTemplateWeek(clinic, dentists) {
        return {
            monday: generateWeek(clinic.openingHours.monday, dentists),
            tuesday: generateWeek(clinic.openingHours.tuesday, dentists),
            wednesday: generateWeek(clinic.openingHours.wednesday, dentists),
            thursday: generateWeek(clinic.openingHours.thursday, dentists),
            friday: generateWeek(clinic.openingHours.friday, dentists)
        }
    }

    function generateWeek(openingHours, dentists) {
        let intermediaryTimeslots = []
        let start = openingHours.start.split(":")[0]
        let end = openingHours.end.split(":")[0]
        for (let i = start; i < end; i++) {
            let hour = i.toString().padStart(2, '0')
            intermediaryTimeslots.push({
                time: `${hour}:00`,
                dentists: dentists
            })
            intermediaryTimeslots.push({
                time: `${hour}:30`,
                dentists: dentists
            })
        }
        return intermediaryTimeslots
    }

    function createTimeslots(input) {

    }

    function triggerLoad() {
        setIsLoading(!isLoading)
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
            <div className={"btn btn-primary"} role={'button'} onClick={triggerLoad}>Trigger load</div>
            <div className={"btn btn-primary"} role={'button'} onClick={generateTimeslotsFromOpeningHours}>Trigger fun</div>
            <React.StrictMode>
                {isLoading ? <Loading/> :
                    <Calendar clinic={currentClinic} clinicTimeslots={currentClinic} client={client}/>}
            </React.StrictMode>
        </div>
    )
}