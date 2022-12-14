import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import Registration from "./ClinicRegistration/Registration";
import React from 'react';
import Home from "./home/Home";
import ViewAppointments from "./ViewAppointments/viewAppointments"
import Navbar from './common_components/navbar'
function App() {

    return(
        //you can add more routes here, just follow the same format
        <>
            <Navbar/>

        <Routes>
            <Route path = "/" element = {< Registration />} />
            <Route path={"/Home"} element= {<Home/>} />
            <Route path={"/appointments"} element= {<ViewAppointments/>} />
        </Routes>
        </>
    );

}

export default App;