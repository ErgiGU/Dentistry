import './App.css';
import {Route, Routes,} from "react-router-dom";

import Registration from "./ClinicRegistration/Registration";
import MapPage from "./clinic_map/map_components/ClinicsMap"
import React from 'react';
import Login from "./ClinicLogin/Login";
import Home from "./home/Home";
import ClinicAppointments from "./ViewAppointments/viewAppointments"
import ClinicHomePage from "./ClinicHomePage/ClinicHomePage";
import MyInformation from "./MyInformation/MyInformation";
import AboutUsSkeleton from "./AboutUsPage/AboutUsSkeleton";
import NewDentist from "./AddDentist/NewDentist";
import ErrorPage from "./ErrorPage";
import Appointments from "./appointments_calendar/Appointments";

export default function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={< Home/>}/>
                <Route path="/addDentist" element={<NewDentist/>}/>
                <Route path="/registration" element={< Registration/>}/>
                <Route path="/login" element={< Login/>}/>
                <Route path="/Home" element={< Home/>}/>
                <Route path="/map" element={< MapPage/>}/>
                <Route path="/clinicAppointments" element={< ClinicAppointments/>}/>
                <Route path="/appointments" element={< Appointments/>}/>
                <Route path="/clinic" element={< ClinicHomePage/>}/>
                <Route path="/profile" element={< MyInformation/>}/>
                <Route path="/aboutUs" element={< AboutUsSkeleton/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route/>
            </Routes>
        </div>
    );
}
