import './App.css';
import {Route, Routes,} from "react-router-dom";

import Registration from "./clinic_registration/Registration";
import MapPage from "./clinics/MapPage"
import React from 'react';
import Login from "./clinic_login/Login";
import Home from "./home/Home";
import Calendar from "./appointments_calendar/Calendar";


function App() {

    return (
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path={"/"}/>
            <Route path={"/registration"} element={< Registration/>}/>
            <Route path={"/login"} element={< Login/>}/>
            <Route path={"/Home"} element={< Home/>}/>
            <Route path={"/map"} element={< MapPage/>}/>
            <Route path={"/calendar"} element={< Calendar/>}/>
        </Routes>
    );
}

export default App;
