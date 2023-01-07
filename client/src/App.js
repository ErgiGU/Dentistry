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
import ViewDentists from "./EditDentists/EditDentists"
import {MyInformation} from "./MyInformation/MyInformation";
import {AboutUsSkeleton} from "./AboutUsPage/AboutUsSkeleton";
import {NewDentist} from "./AddDentist/NewDentist";
import ErrorPage from "./ErrorPage";

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
            <Route path ="/profile" element = {< MyInformation />} />
            <Route path = "/aboutUs" element = {< AboutUsSkeleton />} />
            <Route path = "/error" element = {< ErrorPage />} />
            <Route path ="/clinic" element = {< ClinicHomePage />} />
            <Route path ="/clinic/editInfo" element = {< MyInformation />} />
            <Route path ="/clinic/schedule" element = {< ViewAppointments />} />
            <Route path ="/clinic/dentists" element = {< ViewDentists />} />
        </Routes>
        </>
    );
}

export default App;
