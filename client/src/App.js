import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import Registration from "./ClinicRegistration/Registration";
import React from 'react';
import {AboutUs} from "./AboutUs/AboutUs";
import Home from "./home/Home";


function App() {

    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path = "/" element = {< Registration />} />
            <Route path = "/aboutUs" element = {< AboutUs />} />
            <Route />
            <Route path={"/Home"} element= {<Home/>} />
        </Routes>
    );

}

export default App;