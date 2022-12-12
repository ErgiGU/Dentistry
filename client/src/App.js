import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import Registration from "./ClinicRegistration/Registration";
import React from 'react';
import Home from "./home/Home";
import {Calendar} from "./AppointmentsCalendar/Calendar";


function App() {

    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path = "/" element = {< Registration />} />
            <Route path={"/Home"} element= {<Home/>} />
            <Route path={"/Appointments"} element= {<Calendar/>} />

        </Routes>
    );

}

export default App;
