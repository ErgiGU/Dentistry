/**
 * Skeleton for clinic home page.
 * @author Agata Ciuchta (@ciuchta)
 */
import Card from './Card'
import PrivateNavbar from "../common_components/PrivateNavbar";
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function ClinicHomePage() {
    const navigate = useNavigate();

    /**
     * Navigates the user to the login page in case the user is not
     * authenticated to be on this page
     */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        return () => {
        };
    }, [navigate]);

    return (
        <>
            <PrivateNavbar/>
            <Card/>
        </>
    );
}