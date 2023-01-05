import Card from './Card'
import PrivateNavbar from "../common_components/PrivateNavbar";
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function ClinicHomePage() {
    const navigate = useNavigate();

    /**
     * Navigates the user to the log in page in case the user is not
     * authenticated to be on this page
     */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        return () => {
        };
    }, []);

    return (

        <>
            <PrivateNavbar/>
            <Card/>
        </>
    );
}

export default ClinicHomePage