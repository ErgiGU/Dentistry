// Example common component
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png'
function PrivateNavbar() {
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
<<<<<<< HEAD
                        <Link href="/appointments" >Schedule</Link>
                        <Link href="/">Your information</Link>
                        <Link href="/">Opening hours</Link>
                        <Link href="/">Add a dentist</Link>
                        <Link href="/">Log out</Link>
=======
                        <Nav.Link href="#home" >Home</Nav.Link>
                        <Nav.Link href="#lik">Clinics map</Nav.Link>
                        <Nav.Link href="#link">Book appointment</Nav.Link>
                        <Nav.Link href="#link">Our clinics</Nav.Link>
                        <Nav.Link href="#link">Log out</Nav.Link>
>>>>>>> 24ae8f1 (Clinic home page)
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        </body>

    );
}

export default PrivateNavbar;