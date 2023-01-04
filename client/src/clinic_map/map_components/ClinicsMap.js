import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import "./ClinicsMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mqttHandler from "../../common_components/MqttHandler";
import config from "../../config-client"
import {useNavigate} from "react-router-dom";

// Access token for API
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || config.mapbox_access_token

function asyncMethod(client) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (client !== null) {
                client.subscribe(client.options.clientId + '/#')
                client.publish('mapDataRequest', JSON.stringify({
                    id: client.options.clientId,
                    body: "MapDataRequest"
                }))
                client.on('message', function (topic, message) {
                    switch (topic) {
                        case client.options.clientId + '/mapDataResponse':
                            resolve(JSON.parse(message))
                            break;
                        default:
                            reject(new Error("The wrong message is received"))
                            break;
                    }
                })
            }
        }, 1000)
    })
}

const timeout = new Promise((_ , reject) => {
    setTimeout(() => reject("Timed Out"), 3000)
})

async function waitMap(client) {
    return await asyncMethod(client)
}

//Method which routes to timetable page with selected clinicTitle
/*function selectAppointment(title) {

}*/

export default function Maps() {
    const navigate = useNavigate();
    let clinicData = useRef(null);

    const [client, setClient] = useState(null);

    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        return () => {
            if (client !== null) {
                console.log('ending process')
                client.end()
            }
        }
    }, [client])

    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {
        Promise.race([timeout, asyncMethod(client)]).then(r => {
            if(!clinicData.current && r !== "Timed Out") {
                clinicData.current = r
            }
            //Actual map
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [11.9746, 57.7089],
                zoom: 10,
            });

            // add markers to map
            for (const clinic of clinicData.current.clinics) {
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
        }).catch(() => {
            if(!clinicData.current) {
                navigate("/error")
            }
        })
    }, [client, navigate]);

    return (
        <div id="map-wrapper">
            <div className="map-container" ref={mapContainerRef}/>
        </div>
    );
};