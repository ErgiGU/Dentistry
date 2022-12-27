// Example common component
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png'
function PatientNavbar() {
    return (
        <body>
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
            <h1>DENTAL CLINIC</h1>
        </div>
        <Navbar id="navbar" expand="lg">
            <Container id="me-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end">
                        <Link to="/home">Home</Link>
                        <Link to="/map">Clinics map</Link>
                        <Link to="/">Book appointment</Link>
                        <Link to="/">Our clinics</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        </body>

    );
}

export default PatientNavbar;