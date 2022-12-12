import React, {useState} from 'react';
import "./Calendar.css";
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import {MondaySlots} from "./YourDentistAppointments/MondaySlots";
import {TuesdaySlots} from "./YourDentistAppointments/TuesdaySlots";
import {WednesdaySlots} from "./YourDentistAppointments/WednesdaySlots";
import {ThursdaySlots} from "./YourDentistAppointments/ThursdaySlots";
import {FridaySlots} from "./YourDentistAppointments/FridaySlots";

export function Calendar(){
    const [showTimeslots, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(true);
    };

    return(
        <>
            <div>
                <div className="container">
                <div className="row">
                    <div id="selectClinic" className="col-lg-12 col-md-12 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Select Clinic </Card.Title>
                                <input type="radio" value="YourDentist" name="clinicName" onClick={handleClick} /> Your Dentist&nbsp;&nbsp;&nbsp;
                                <input type="radio" value="ToothFairy" name="clinicName" /> Tooth Fairy&nbsp;&nbsp;&nbsp;
                                <input type="radio" value="TheCrown" name="clinicName" /> The Crown&nbsp;&nbsp;&nbsp;
                                <input type="radio" value="LisebergDentist" name="clinicName" /> Liseberg Dentist&nbsp;&nbsp;&nbsp;
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                    <div className="row">
                    <div id="timeSlots" className="col-lg-2">

                        <CardGroup className="card">
                            <Card.Body>
                                <Card.Title>WEEK x</Card.Title>
                            </Card.Body>
                        </CardGroup>
                    </div>
                    <div id="timeSlots" className="col-lg-2">
                        <CardGroup className="card">
                            <Card.Body>
                                <Card.Title>Monday</Card.Title>
                                {showTimeslots && (
                                <MondaySlots />
                                )}
                            </Card.Body>
                        </CardGroup>
                    </div>
                    <div id="timeSlots" className="col-lg-2">
                        <CardGroup className="card">

                            <Card.Body>
                                <Card.Title>Tuesday</Card.Title>
                                {showTimeslots && (
                                    <TuesdaySlots />
                                )}
                            </Card.Body>
                        </CardGroup>
                    </div>
                    <div id="timeSlots" className="col-lg-2">
                        <CardGroup className="card">
                            <Card.Body>
                                <Card.Title>Wednesday</Card.Title>
                                {showTimeslots && (
                                    <WednesdaySlots />
                                )}
                            </Card.Body>
                        </CardGroup>
                    </div>
                    <div id="timeSlots" className="col-lg-2">
                        <CardGroup className="card">
                            <Card.Body>
                                <Card.Title>Thursday</Card.Title>
                                {showTimeslots && (
                                    <ThursdaySlots />
                                )}
                            </Card.Body>
                        </CardGroup>
                    </div>
                    <div id="timeSlots" className="col-lg-2">
                        <CardGroup className="card">
                            <Card.Body>
                                <Card.Title>Friday</Card.Title>
                                {showTimeslots && (
                                    <FridaySlots />
                                )}
                            </Card.Body>
                        </CardGroup>
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}
