/**
 * Navbar displayed for the patients.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import './Navbar.css'

export default function PatientNavbar() {
    return (
        <div>
            <div id="headerDentist">
                <img id="logoNavbar" src={logo} alt="logo"/>
                <h1 id={'name'}>DENTISTRY</h1>
            </div>
            <Navbar id="navbar" expand="lg">
                <Container className="me-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-center'}>
                        <Nav.Link href="home">Home</Nav.Link>
                        <Nav.Link href="map">Clinics map</Nav.Link>
                        <Nav.Link href="appointments">Book appointment</Nav.Link>
                        <Nav.Link href="aboutus">Our clinics</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}