import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import {Registration} from "./ClinicRegistration/Registration";
import {MyInformation} from "./MyInformation/MyInformation"
import React from 'react';


function App() {

    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path = "/n" element = {< Registration />} />
            <Route />
            <Route path = "/" element = {< MyInformation />} />
            <Route />
        </Routes>
    );

}

export default App;