import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import Registration from "./ClinicRegistration/Registration";
import React from 'react';
import {AboutUs} from "./AboutUsPage/AboutUs";
import {YourDentist} from "./AboutUsPage/YourDentist";
import {LisebergDentist} from "./AboutUsPage/LisebergDentist";
import {ToothFairy} from "./AboutUsPage/ToothFairy";
import {TheCrown} from "./AboutUsPage/TheCrown";
import {AboutUsSkeleton} from "./AboutUsPage/AboutUsSkeleton";


function App() {

    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path = "/" element = {< Registration />} />
            <Route path = "/aboutUs" element = {< AboutUsSkeleton />} />
            <Route />
        </Routes>
    );

}

export default App;
