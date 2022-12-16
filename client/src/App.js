import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";

import Registration from "./ClinicRegistration/Registration";
import MapPage from "./clinics/MapPage"
import {MyInformation} from "./MyInformation/MyInformation"
import React from 'react';
import Login from "./ClinicLogin/Login";
import Home from "./home/Home";
import {NewDentist} from "./AddDentist/NewDentist";


function App() {

    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path ="/" element={<NewDentist/>}/>
            <Route path ="/registration" element= {< Registration />} />
            <Route path ="/login" element= {< Login />} />
            <Route path ="/Home" element= {< Home />} />
            <Route path ="/map" element = {< MapPage />} />
            <Route path ="/profile" element = {< MyInformation />} />
        </Routes>
    );
}

export default App;