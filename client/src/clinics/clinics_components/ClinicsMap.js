import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import "./ClinicsMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mqttHandler from "../../common_components/MqttHandler";

// Access token for API
mapboxgl.accessToken =
    "pk.eyJ1IjoiYnVyYWthc2thbjIxIiwiYSI6ImNsYXFxNjY2YzAzdjMzb280YTVsMGUzYWQifQ.knfsQ7s0FiRYVpf5-yDGWQ";

// Sample data
let geoJson = {
    random: "random"
}
function asyncMethod(client) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (client !== null) {
                client.subscribe(client.options.clientId + '/mapDataResponse')
                client.publish('mapDataRequest', JSON.stringify({
                    id: client.options.clientId,
                    body: "MapDataRequest"
                }))
                client.on('message', function (topic, message) {
                    switch (topic) {
                        case client.options.clientId + '/mapDataResponse':
                            geoJson = JSON.parse(message)
                            console.log(geoJson)
                            resolve("Sucess")
                            break;
                        default:
                            reject()
                            break;
                    }
                })
            }
        }, 1000)
    })
}

async function waitMap(client) {
    await asyncMethod(client)
}
/*let geoJson = {
    clinics: [
        {
            coordinates: [-77.032, 38.913],
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
        {
            coordinates: [11.9746, 57.7089],
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            coordinates: [11.9746, 52.7089],
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            coordinates: [10.9746, 57.7089],
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        }
    ]
};*/

//Method which routes to timetable page with selected clinicTitle
function selectAppointment(title) {

}

export default function Maps() {

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
        waitMap(client).then(r => {
            //Actual map
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [11.9746, 57.7089],
                zoom: 10,
            });

            // add markers to map
            for (const clinic of geoJson.clinics) {
                // make a marker for each clinic and add to the map
                new mapboxgl.Marker().setLngLat(clinic.coordinates).setPopup(
                    new mapboxgl.Popup({offset: 25}) // add popups
                        .setHTML(
                            `<h3>${clinic.properties.title}</h3>
                         <p>${clinic.properties.description}</p>
                         <button type="button" class="btn btn-primary" onclick="selectAppointment(${clinic.properties.title})">Book Appointment</button>`
                        )
                ).addTo(map);
            }
            return () => map.remove();
        })
    }, [client]);

    return (
        <div id="map-wrapper">
            <div className="map-container" ref={mapContainerRef}/>
        </div>
    );
};