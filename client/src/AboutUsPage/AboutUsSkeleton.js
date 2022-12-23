import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import dentistImg from "./Assets/DentistImage.png";
import "./AboutUs.css";
import {Button} from "react-bootstrap";
import {YourDentist} from "./YourDentist";
import {ToothFairy} from "./ToothFairy";
import {TheCrown} from "./TheCrown";
import {LisebergDentist} from "./LisebergDentist";
import {AboutUs} from "./AboutUs";

export function AboutUsSkeleton(){
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
        <>
            <div id="main" >
                <h1 id="heading">About Us</h1>
                <div id="info">
                    <div id="image">
                        <img src={dentistImg} alt="dentist" style={{width: "90%"}} />
                    </div>
                    <div id="clinicText">
                        {showClinic1 && <YourDentist/>}
                        {showClinic2 && <ToothFairy/>}
                        {showClinic3 && <TheCrown/>}
                        {showClinic4 && <LisebergDentist/>}
                        {showAboutUs && <AboutUs/>}
                    </div>

                </div>
                <br/>
                <div id="b-row" class="row">
                    <p id="clinic-name" >OUR CLINICS <hr /> </p>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <Card style={{ width: "20rem"}}>
                            <Card.Body>
                                <Card.Title style={{ color: "#003d80" }}>YOUR DENTIST</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    One Step away from that perfect Smile :)
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Dan Tist <br/>
                                    Address: Spannmålsgatan 20
                                </Card.Text>
                                <Button variant="primary" onClick={clinic1Click}> More Info </Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <Card style={{ width: "20rem"}}>
                            <Card.Body>
                                <Card.Title style={{ color: "#003d80" }}>TOOTH FAIR DENTIST</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Fix the teeth that your tooth fairy didn't
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Tooth Fairy <br/>
                                    Address: Slottskogen
                                </Card.Text>
                                <Button variant="primary" onClick={clinic2Click}>More Info</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-4">
                        <Card style={{ width: "20rem" }}>
                            <Card.Body>
                                <Card.Title style={{ color: "#003d80" }}>THE CROWN</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Perfect crown for your teeth does exist
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Carmen Crown <br/>
                                    Address: Lindholmsallén 19
                                </Card.Text>
                                <Button variant="primary"onClick={clinic3Click}>More Info</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <Card style={{ width: "20rem"}}>
                            <Card.Body>
                                <Card.Title style={{ color: "#003d80" }}>LISEBERGS DENTISTS</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    We aim to mend your teeth as fast as Helix!
                                </Card.Subtitle>
                                <Card.Text>
                                    Owner: Glen Hysén <br/>
                                    Address: Liseberg
                                </Card.Text>
                                <Button variant="primary" onClick={clinic4Click}>More Info</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>

        </>
    )
}
