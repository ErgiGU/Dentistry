// Example common component
import React from 'react';
import './Navbar.css'
function Navbar() {
    return (
        <body>
        <div className="header">
            <img className="logo" src="https://cdn-icons-png.flaticon.com/512/2035/2035058.png" alt="logo" />
            <h1>DENTAL CLINIC</h1>
        </div>
    <div id="navbar">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
        <a className="active" href="javascript:void(0)">Home</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
        <a href="javascript:void(0)">News</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
        <a href="javascript:void(0)">Contact</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
        <a href="javascript:void(0)">Contact</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
        <a href="javascript:void(0)">Contact</a>
    </div>
        </body>
);
}

export default Navbar;