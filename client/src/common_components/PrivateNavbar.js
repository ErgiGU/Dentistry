/**
 * Navbar displayed for logged clinics.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png'
import './Navbar.css'

function PrivateNavbar() {
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
            <div className="headerDentist">
                <img className="logoNavbar" src={Logo} alt="logo"/>
                <h1>DENTAL CLINIC</h1>
            </div>
            <Navbar id="navbar" expand="lg">
                <Container id="me-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end">

                        <Link to={'/clinic/schedule'} >Schedule</Link>
                        <Link to={'/clinic/editInfo'} >Your information</Link>
                        <Link to={'/clinic/dentists'}>Edit dentist's</Link>
                        <Link to={'/appointments'}>Schedule</Link>
                        <Link to={'/profile'}>Your information</Link>
                        <Link to={'/addDentist'}>Add a dentist</Link>
                        <Link onClick={logout} to={'/login'}>Log out</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>

    );
}

export default PrivateNavbar;