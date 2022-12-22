// Example common component
import React from 'react';
import './Navbar.css'
function Navbar() {
    return (
        <div>
        <div className="header">
            <img className="logo" src="https://cdn-icons-png.flaticon.com/512/2035/2035058.png" alt="logo" />
            <h1>DENTAL CLINIC</h1>
        </div>
    <div id="navbar">
        <a className="active" href="javascript:void(0)">Home</a>
        <a href="javascript:void(0)">News</a>
        <a href="javascript:void(0)">Contact</a>
        <a href="javascript:void(0)">Contact</a>
        <a href="javascript:void(0)">Contact</a>
    </div>
        </div>
);
}

export default Navbar;