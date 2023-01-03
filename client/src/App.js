import './App.css';
import {Route, Routes,} from "react-router-dom";

import Registration from "./clinic_registration/Registration";
import MapPage from "./clinics/MapPage"
import React from 'react';
import Login from "./clinic_login/Login";
import Home from "./home/Home";
import ViewAppointments from "./ViewAppointments/viewAppointments"
import ClinicHomePage from "./ClinicHomePage/ClinicHomePage";
import {MyInformation} from "./MyInformation/MyInformation";
import {AboutUsSkeleton} from "./AboutUsPage/AboutUsSkeleton";
import {NewDentist} from "./AddDentist/NewDentist";
function App() {

    return (
        //you can add more routes here, just follow the same format
        <>

        <Routes>
            <Route path ="/addDentist" element={<NewDentist/>}/>
            <Route path ="/registration" element= {< Registration />} />
            <Route path ="/login" element= {< Login />} />
            <Route path ="/Home" element= {< Home />} />
            <Route path ="/map" element = {< MapPage />} />
            <Route path ="/appointments" element = {< ViewAppointments />} />
            <Route path ="/clinic" element = {< ClinicHomePage/>} />
            <Route path ="/profile" element = {< MyInformation />} />
            <Route path = "/" element = {< Registration />} />
            <Route path = "/aboutUs" element = {< AboutUsSkeleton />} />
            <Route />
        </Routes>
        </>
    );
}

export default App;
