import React, {useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";
import "./ClinicsMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import config from "../config-client"
import {useNavigate} from "react-router-dom";

// Access token for API
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || config.mapbox_access_token

//Method which routes to timetable page with selected clinicTitle
/*function selectAppointment(title) {

}*/

export default function Maps(props) {
    const navigate = useNavigate()
    let clinicData = useRef(true);

    function sendMessage(topic, json) {
        if (props.client !== null) {
            clinicData.current = true
            props.client.publish(topic, JSON.stringify(json))
            setTimeout(() => {
                if (clinicData.current) {
                    navigate("/error");
                }
            }, 3000);

        }else {
            navigate("/error")
        }
    }

    function asyncMethod(client) {
        return new Promise((resolve, reject) => {
            if (client !== null) {
                client.subscribe(client.options.clientId + '/#')
                sendMessage('mapDataRequest', {
                    id: client.options.clientId,
                    body: "MapDataRequest"
                })
                client.on('message', function (topic, message) {
                    clinicData.current = false
                    switch (topic) {
                        case client.options.clientId + '/mapDataResponse':
                            resolve(JSON.parse(message))
                            break;
                        default:
                            reject(new Error("The wrong message is received"))
                            break;
                    }
                })
            }else {
                navigate("/error")
            }
        })
    }

    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        generateMap()
        return () => {
            if (props.client !== null) {
                console.log('ending process')
                props.client.end()
            }
        }
    })

    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    function generateMap() {
        asyncMethod(props.client).then(r => {
            //Actual map
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [11.9746, 57.7089],
                zoom: 10,
            });

            // add markers to map
            for (const clinic of r.clinics) {
                // make a marker for each clinic and add to the map
                new mapboxgl.Marker().setLngLat(clinic.coordinates).setPopup(
                    new mapboxgl.Popup({offset: 25}) // add popups
                        .setHTML(
                            `<h3>${clinic.properties.title}</h3>
                         <p>${clinic.properties.address}</p>
                         <p>${clinic.properties.opening_hours}</p>
                         <button type="button" class="btn btn-primary" onclick="selectAppointment(${clinic.properties.title})">Book Appointment</button>`
                        )
                ).addTo(map);
            }
            return () => map.remove();
        })
    }

    return (
        <div id="map-wrapper">
            <div className="map-container" ref={mapContainerRef}/>
        </div>
    );
};