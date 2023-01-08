import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import dentistImg from "./Assets/DentistImage.png";
import "./AboutUs.css";
import {Button} from "react-bootstrap";
import YourDentist from "./YourDentist";
import ToothFairy from "./ToothFairy";
import TheCrown from "./TheCrown";
import LisebergDentist from "./LisebergDentist";
import AboutUs from "./AboutUs";
import PatientNavbar from "../common_components/PatientNavbar";

export default function AboutUsSkeleton() {
    const [showClinic1, setShowClinic1] = useState(false);
    const [showClinic2, setShowClinic2] = useState(false);
    const [showClinic3, setShowClinic3] = useState(false);
    const [showClinic4, setShowClinic4] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(true);

    const clinic1Click = event => {
        setShowClinic1(true);
        setShowClinic2(false);
        setShowClinic3(false);
        setShowClinic4(false);
        setShowAboutUs(false);
    };
    const clinic2Click = event => {
        setShowClinic2(true);
        setShowClinic1(false);
        setShowClinic3(false);
        setShowClinic4(false);
        setShowAboutUs(false);

    };
    const clinic3Click = event => {
        setShowClinic3(true);
        setShowClinic2(false);
        setShowClinic1(false);
        setShowClinic4(false);
        setShowAboutUs(false);

    };
    const clinic4Click = event => {
        setShowClinic4(true);
        setShowClinic2(false);
        setShowClinic3(false);
        setShowClinic1(false);
        setShowAboutUs(false);
    };

    return (
        <div>
            <PatientNavbar/>
            <div id="aboutUs-main">
                <h1 id="aboutUs-heading">About Us</h1>
                <div id="info">
                    <div id="aboutUs-image">
                        <img src={dentistImg} alt="dentist" style={{width: "90%"}}/>
                    </div>
                    <div id="aboutUs-clinicText">
                        {showAboutUs && <AboutUs/>}
                        {showClinic1 && <YourDentist/>}
                        {showClinic2 && <ToothFairy/>}
                        {showClinic3 && <TheCrown/>}
                        {showClinic4 && <LisebergDentist/>}
                    </div>
                </div>
                <br/>
                <div id="aboutUs-b-row" className="row">
                    <p id="aboutUs-clinic-name">OUR CLINICS <hr/></p>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <Card style={{width: "20rem", backgroundColor: "whitesmoke"}}>
                            <Card.Body>
                                <Card.Title style={{color: "#003d80"}}>YOUR DENTIST</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    One Step away from that perfect Smile :)
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Dan Tist <br/>
                                    Address: Spannmålsgatan 20
                                </Card.Text>
                                <Button variant="primary" onClick={clinic1Click}
                                        style={{backgroundColor: "steelblue"}}> More Info </Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <Card style={{width: "20rem", backgroundColor: "whitesmoke"}}>
                            <Card.Body>
                                <Card.Title style={{color: "#003d80"}}>TOOTH FAIR DENTIST</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Fix the teeth that your tooth fairy didn't
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Tooth Fairy <br/>
                                    Address: Slottskogen
                                </Card.Text>
                                <Button variant="primary" onClick={clinic2Click} style={{backgroundColor: "steelblue"}}>More
                                    Info</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <Card style={{width: "20rem", backgroundColor: "whitesmoke"}}>
                            <Card.Body>
                                <Card.Title style={{color: "#003d80"}}>THE CROWN</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Perfect crown for your teeth does exist
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Carmen Crown <br/>
                                    Address: Lindholmsallén 19
                                </Card.Text>
                                <Button variant="primary" onClick={clinic3Click} style={{backgroundColor: "steelblue"}}>More
                                    Info</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <Card style={{width: "20rem", backgroundColor: "whitesmoke"}}>
                            <Card.Body>
                                <Card.Title style={{color: "#003d80"}}>LISEBERGS DENTISTS</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    We aim to mend your teeth as fast as Helix!
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Glen Hysén <br/>
                                    Address: Liseberg
                                </Card.Text>
                                <Button variant="primary" onClick={clinic4Click} style={{backgroundColor: "steelblue"}}>More
                                    Info</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
