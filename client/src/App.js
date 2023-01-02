import './App.css';
import {
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import {Registration} from "./ClinicRegistration/Registration";
import React from 'react';
import {AboutUs} from "./AboutUs/AboutUs";


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
            <Route path = "/" element = {< Registration />} />
            <Route path = "/aboutUs" element = {< AboutUs />} />
            <Route />
        </Routes>
    );


}

export default App;
