import "./Calendar.css";
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import Timeslots from "./Timeslots";
import {useState} from "react";

    const Calendar = () => {
        const [yourDentistTimeslots, setYourDentistTimeslots] = useState(false)
        const clinic1Click = event => {
            setYourDentistTimeslots(current => !current);
            setToothFairyTimeslots(false);
            setLisebergDentistsTimeslots(false);
            setTheCrownTimeslots(false);
        };

        const [toothFairyTimeslots, setToothFairyTimeslots] = useState(false)
        const clinic2Click = event => {
            setToothFairyTimeslots(current => !current);
            setYourDentistTimeslots(false);
            setLisebergDentistsTimeslots(false);
            setTheCrownTimeslots(false);
        };

        const [theCrownTimeslots, setTheCrownTimeslots] = useState(false)
        const clinic3Click = event => {
            setTheCrownTimeslots(current => !current);
            setYourDentistTimeslots(false);
            setToothFairyTimeslots(false);
            setLisebergDentistsTimeslots(false);
        };

        const [lisebergDentistsTimeslots, setLisebergDentistsTimeslots] = useState(false)
        const clinic4Click = event => {
            setLisebergDentistsTimeslots(current => !current);
            setYourDentistTimeslots(false);
            setToothFairyTimeslots(false);
            setTheCrownTimeslots(false);
        };

        const yourClinicMonday = [
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3}
        ];
        const yourClinicTuesday = [
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3}
        ];
        const yourClinicWednesday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
        ];
        const yourClinicThursday = [
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
        ];
        const yourClinicFriday = [
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
        ];

        const toothFairyMonday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
            {time: "18:00", batch: 3},
            {time: "18:30", batch: 3},
        ];
        const toothFairyTuesday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
            {time: "18:00", batch: 3},
            {time: "18:30", batch: 3},
        ];
        const toothFairyWednesday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
            {time: "18:00", batch: 3},
            {time: "18:30", batch: 3},
        ];
        const toothFairyThursday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
            {time: "18:00", batch: 3},
            {time: "18:30", batch: 3},
        ];
        const toothFairyFriday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
            {time: "18:00", batch: 3},
            {time: "18:30", batch: 3},
        ];

        const theCrownMonday = [
            {time: "06:00", batch: 3},
            {time: "06:30", batch: 3},
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
        ];
        const theCrownTuesday = [
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
        ];
        const theCrownWednesday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
        ];
        const theCrownThursday = [
            {time: "07:00", batch: 3},
            {time: "07:30", batch: 3},
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
        ];
        const theCrownFriday = [
            {time: "08:00", batch: 3},
            {time: "08:30", batch: 3},
            {time: "09:00", batch: 3},
            {time: "09:30", batch: 3},
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
        ];

        const lisebergDentistMonday = [
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
        ];
        const lisebergDentistTuesday = [
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
        ];
        const lisebergDentistWednesday = [
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
        ];
        const lisebergDentistThursday = [
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
        ];
        const lisebergDentistFriday = [
            {time: "10:00", batch: 3},
            {time: "10:30", batch: 3},
            {time: "11:00", batch: 3},
            {time: "11:30", batch: 3},
            {time: "12:00", batch: 3},
            {time: "12:30", batch: 3},
            {time: "13:00", batch: 3},
            {time: "13:30", batch: 3},
            {time: "14:00", batch: 3},
            {time: "14:30", batch: 3},
            {time: "15:00", batch: 3},
            {time: "15:30", batch: 3},
            {time: "16:00", batch: 3},
            {time: "16:30", batch: 3},
            {time: "17:00", batch: 3},
            {time: "17:30", batch: 3},
        ];



    return (
        <>
            <div>
                <div className="container">
                    <div className="row">
                        <div id="selectClinic" className="col-lg-12 col-md-12 mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Select Clinic </Card.Title>
                                    <input type="radio" value="YourDentist" name="clinicName" onClick= {clinic1Click} />
                                    Your Dentist&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="ToothFairy" name="clinicName" onClick= {clinic2Click} />
                                    Tooth Fairy&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="TheCrown" name="clinicName" onClick={clinic3Click}/>
                                    The Crown&nbsp;&nbsp;&nbsp;
                                    <input type="radio" value="LisebergDentist" name="clinicName" onClick={clinic4Click}/>
                                    Liseberg Dentist&nbsp;&nbsp;&nbsp;
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div id="week" className="col-lg-12 col-md-12 col-sm-12">
                            <CardGroup className="card">
                                <Card.Body>
                                    <Card.Title>WEEK x</Card.Title>
                                </Card.Body>
                            </CardGroup>
                            <br/>
                        </div>

                        <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                            <CardGroup className="card">
                                <Card.Body>
                                    <Card.Title>Monday</Card.Title>
                                    {toothFairyTimeslots && <Timeslots slot={toothFairyMonday} />}
                                    {yourDentistTimeslots && <Timeslots slot={yourClinicMonday} />}
                                    {theCrownTimeslots && <Timeslots slot={theCrownMonday} />}
                                    {lisebergDentistsTimeslots && <Timeslots slot={lisebergDentistMonday} />}
                                </Card.Body>
                            </CardGroup>
                        </div>
                        <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                            <CardGroup className="card">

                                <Card.Body>
                                    <Card.Title>Tuesday</Card.Title>
                                    {toothFairyTimeslots && <Timeslots slot={toothFairyTuesday} />}
                                    {yourDentistTimeslots && <Timeslots slot={yourClinicTuesday} />}
                                    {theCrownTimeslots && <Timeslots slot={theCrownTuesday} />}
                                    {lisebergDentistsTimeslots && <Timeslots slot={lisebergDentistTuesday} />}
                                </Card.Body>
                            </CardGroup>
                        </div>
                        <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                            <CardGroup className="card">
                                <Card.Body>
                                    <Card.Title>Wednesday</Card.Title>
                                    {toothFairyTimeslots && <Timeslots slot={toothFairyWednesday} />}
                                    {yourDentistTimeslots && <Timeslots slot={yourClinicWednesday} />}
                                    {theCrownTimeslots && <Timeslots slot={theCrownWednesday} />}
                                    {lisebergDentistsTimeslots && <Timeslots slot={lisebergDentistWednesday} />}
                                </Card.Body>
                            </CardGroup>
                        </div>
                        <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                            <CardGroup className="card">
                                <Card.Body>
                                    <Card.Title>Thursday</Card.Title>
                                    {toothFairyTimeslots && <Timeslots slot={toothFairyThursday} />}
                                    {yourDentistTimeslots && <Timeslots slot={yourClinicThursday} />}
                                    {theCrownTimeslots && <Timeslots slot={theCrownThursday} />}
                                    {lisebergDentistsTimeslots && <Timeslots slot={lisebergDentistThursday} />}
                                </Card.Body>
                            </CardGroup>
                        </div>
                        <div id="timeSlots" className="col-lg-2 col-md-4 col-sm-12">
                            <CardGroup className="card">
                                <Card.Body>
                                    <Card.Title>Friday</Card.Title>
                                    {toothFairyTimeslots && <Timeslots slot={toothFairyFriday} />}
                                    {yourDentistTimeslots && <Timeslots slot={yourClinicFriday} />}
                                    {theCrownTimeslots && <Timeslots slot={theCrownFriday} />}
                                    {lisebergDentistsTimeslots && <Timeslots slot={lisebergDentistFriday} />}
                                </Card.Body>
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar;
//give the timeslot skeleton to timeslot.js and array for that timeslot
