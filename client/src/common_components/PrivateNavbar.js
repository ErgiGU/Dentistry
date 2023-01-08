/**
 * Navbar displayed for logged clinics.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
            <Navbar id="navbar" expand="lg">
                <Container className="me-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-center'}>
                        <Link to={'/clinicAppointments'}>Schedule</Link>
                        <Link to={'/profile'}>Your information</Link>
                        <Link to={'/addDentist'}>Add a dentist</Link>
                        <Link to={'/clinic/dentists'}>Edit dentist's</Link>
                        <Link onClick={logout} to={'/login'}>Log out</Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}