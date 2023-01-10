/**
 * Navbar displayed for logged clinics.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png'
import './Navbar.css'

export default function PrivateNavbar() {
    const navigate = useNavigate();

    function logout() {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            localStorage.removeItem('token');
            navigate("/login");
        }
    }

    return (
        <div>
            <div id="headerDentist">
                <img id="logoNavbar" src={Logo} alt="logo"/>
                <h1 id={'name'}>DENTISTRY</h1>
            </div>
            <Navbar id="navbar" expand={'md'}>
                <Container className="me-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className={'nav-fill justify-content-evenly justify-content-center'}>
                        <Nav.Link href={'/clinic'}>Home</Nav.Link>
                        <Nav.Link href={'/clinic/schedule'}>Schedule</Nav.Link>
                        <Nav.Link href={'/clinic/profile'}>Your information</Nav.Link>
                        <Nav.Link href={'/clinic/addDentist'}>Add a dentist</Nav.Link>
                        <Nav.Link href={'/clinic/editDentists'}>Edit dentists</Nav.Link>
                        <Nav.Link onClick={logout} to={'/login'}>Log out</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}