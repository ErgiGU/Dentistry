import './ViewAppointments.css'
import React from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
const mongoose = require('mongoose')
const Schema = mongoose.Schema

function WithHeaderExample(props) {
    const text = "Hello"
    return (
        <div id="ty">
        <div id="background">
        <MDBRow>
            <MDBCol md='3'>
                <div className="card" >
                    <div className="card-body">
                        <img className="clinic" src="https://cdn-icons-png.flaticon.com/512/2317/2317964.png" alt="clinic" />
                    </div>
                    <div className="card-body">
                        <button type="button" className="btn">LOG OUT</button>
                    </div>
                </div>
            </MDBCol>

            <MDBCol md='8'>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">DATE<div className="text">{text}</div></div>
                            <div className="col">TIME<div className="text">hello</div></div>
                            <div className="col">LOCATION<div className="text">hello</div></div>
                            <div className="col">PATIENT<div className="text">hello</div></div>
                            <div className="col">DOCTOR<div className="text">hello</div></div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
                <div className="card1" >

                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col">Date</div>
                            <div className="col">Time</div>
                            <div className="col">Location</div>
                            <div className="col">Patient</div>
                            <div className="col">Doctor</div>
                        </div>
                    </div>
                </div>
            </MDBCol>
        </MDBRow>

        </div>
        </div>
    );
}

export default WithHeaderExample;