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
import ClinicHomePage from "./ClinicHomePage/ClinicHomePage";
import {NewDentist} from "./AddDentist/NewDentist";
import {AboutUsSkeleton} from "./AboutUsPage/AboutUsSkeleton";
import {MyInformation} from "./MyInformation/MyInformation";


function App() {

    return(
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