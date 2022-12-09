import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import Registration from "./ClinicRegistration/Registration";
import {MapPage} from "./clinics/MapPage"
import React from 'react';
import Home from "./home/Home";


function App() {

    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path = "/" element = {< MapPage />} />
            <Route path = "/Registration" element = {< Registration />} />
            <Route path = "/Home" element= {<Home/>} />
        </Routes>
    );
}

export default App;