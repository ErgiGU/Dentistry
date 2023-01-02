import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";

import Registration from "./ClinicRegistration/Registration";
import MapPage from "./clinics/MapPage"
import React from 'react';
import Login from "./ClinicLogin/Login";
import Home from "./home/Home";
import ViewAppointments from "./ViewAppointments/viewAppointments"
function App() {

    return(
        //you can add more routes here, just follow the same format
        <>

        <Routes>
            <Route path ="/" />
            <Route path ="/registration" element= {< Registration />} />
            <Route path ="/login" element= {< Login />} />
            <Route path ="/Home" element= {< Home />} />
            <Route path ="/map" element = {< MapPage />} />
            <Route path ="/appointments" element = {< ViewAppointments />} />
        </Routes>
        </>
    );
}

export default App;