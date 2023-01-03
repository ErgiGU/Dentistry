// Example common component
import React from 'react';
import './Navbar.css'
//import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/logo.png'
function Navbarr() {
    return (
        <body>
        <div className="header">
            <img className="logo" src={Logo} alt="logo" />
            <h1>DENTAL CLINIC</h1>
        </div>
        <Navbar id="navbar" expand="lg">
            <Container id="me-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end">
                        <Nav.Link href="#home" >Home</Nav.Link>
                        <Nav.Link href="#link">Clinics map</Nav.Link>
                        <Nav.Link href="#link">Book appointment</Nav.Link>
                        <Nav.Link href="#link">Our clinics</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        </body>
    );
}

export default Navbarr;