/**
 * Skeleton for patient home page.
 * @author Agata Ciuchta (@ciuchta)
 */

import './Home.css'
import React from 'react';
import Card from './Card';
import PatientNavbar from "../common_components/PatientNavbar";

export default function Home() {
    return (
        <>
            <PatientNavbar/>
            <Card/>
            <div id={'footer'}>
                <a id="clinic" href="/login">Are you a clinic? Click here!</a>
            </div>
        </>
    );
}
