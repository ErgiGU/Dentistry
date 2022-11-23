import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import {Registration} from "./ClinicRegistration/Registration";
import {SearchClinic} from "./clinics/SearchClinic"
import React from 'react';
import SearchClinic from './clinics/SearchClinic';


function App() {

/*    function sendMessage(type, url, topic, message) {
        fetch(url, {
            method: type,
            body: JSON.stringify({
                topic: topic,
                message: message
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {
            console.log('Sent request')
            console.log(response.json())
        })
        return ""
    }*/


    return(
        //you can add more routes here, just follow the same format
        <Routes>
            <Route path = "/" element = {< SearchClinic />} />
            <Route path = "/" element = {< Registration />} />
            <Route />
        </Routes>
    );
}

export default App;