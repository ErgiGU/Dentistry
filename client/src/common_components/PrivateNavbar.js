// Example common component
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png'
function PrivateNavbar() {
    const navigate = useNavigate();
    function logout(){
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            localStorage.removeItem('token');
            navigate("/login");
        }
    }
    return (
        <div>
        <div className="header">
            <img className="logo" src={Logo} alt="logo" />
            <h1>DENTAL CLINIC</h1>
        </div>
        <Navbar id="navbar" expand="lg">
            <Container id="me-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end">

                        <Link to={'/'}>Schedule</Link>
                        <Link to={'/'} >Your information</Link>
                        <Link to={'/'} >Opening hours</Link>
                        <Link to={'/'}>Add a dentist</Link>
                        <a onClick={logout} >Log out</a>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        </div>

    );
}

export default PrivateNavbar;