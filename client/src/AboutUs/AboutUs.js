import React from 'react';
import Card from "react-bootstrap/Card";
import dentistImg from "./Assets/DentistImage.png";
export function AboutUs(){
    return (
        <>
            <div style={{backgroundColor: "#e6f2ff"}}>
            <h1 style={{color: "#003d80"}}>About Us</h1>
            <div style={{width: "100%"}}>
                <div style={{width: "40%", float: "right", marginRight: "0px"}}>
                    <img src={dentistImg} alt="dentistImg" style={{height: "400px", width: "550px"}}/>
                </div>
               <div style={{width: "60%", float: "left"}}>
                   <p style={{textAlign: "center", fontSize: 20, fontFamily: "Helvetica"}}>
                   <span style={{color: "#003d80"}}> OUR STORY </span>   <br />
                   Dentistry is an online dental care booking application for clinics all over Gothenburg  <br/>
                   Through our very flexible booking time slots specially adapted to the patients needs, <br/>
                   We aim to help you book your desired clinic at your desired time and location in Gothenburg! </p>
               </div>
            </div>
            <br/>
            <div class="row" style={{marginTop: "20px", width: "100%"}}>
                <p style={{textAlign: "center", color: "#003d80", fontSize: 20}}>OUR CLINICS </p>
            <div class="col-lg-3 mb-4">
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
                    <Card.Link href="#"> More info</Card.Link>
                </Card.Body>
            </Card>
            </div>
            <div class="col-lg-3 mb-4">
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
                    <Card.Link href="#"> More info</Card.Link>
                </Card.Body>
            </Card>
            </div>
            <div class="col-lg-3 mb-4">
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
                    <Card.Link href="#"> More info</Card.Link>
                </Card.Body>
            </Card>
            </div>
            <div class="col-lg-3 mb-4">
            <Card style={{ width: "20rem", marginRight: "0px" }}>
                <Card.Body>
                    <Card.Title style={{ color: "#003d80" }}>LISEBERGS DENTISTS</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        We aim to mend your teeth as fast as Helix!
                    </Card.Subtitle>
                    <Card.Text>
                        Owner: Glen Hysén <br/>
                        Address: Liseberg
                    </Card.Text>
                    <Card.Link href="#"> More info</Card.Link>
                </Card.Body>
            </Card>
            </div>
            </div>
        </div>

        </>
    )
}