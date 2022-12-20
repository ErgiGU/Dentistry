// Example common component
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
<<<<<<< HEAD
import logo from '../assets/logo.png'
=======
import logo from '../h'
>>>>>>> 24ae8f1 (Clinic home page)
function PatientNavbar() {
    return (
        <body>
        <div className="header">
<<<<<<< HEAD
            <img className="logo" src={logo} alt="logo" />
=======
            <img className="logo" alt="logo" />
>>>>>>> 24ae8f1 (Clinic home page)
            <h1>DENTAL CLINIC</h1>
        </div>
        <Navbar id="navbar" expand="lg">
            <Container id="me-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end">
<<<<<<< HEAD
                        <Link to="/home">Home</Link>
                        <Link to="/map">Clinics map</Link>
                        <Link to="/">Book appointment</Link>
                        <Link to="/">Our clinics</Link>
=======
                        <Nav.Link href="#home" >Home</Nav.Link>
                        <Nav.Link href="#link">Clinics map</Nav.Link>
                        <Nav.Link href="#link">Book appointment</Nav.Link>
                        <Nav.Link href="#link">Our clinics</Nav.Link>
>>>>>>> 24ae8f1 (Clinic home page)
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        </body>

    );
}

export default PatientNavbar;