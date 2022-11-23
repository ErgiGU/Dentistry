import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./ClinicsMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';

// Access token for API
mapboxgl.accessToken =
    "pk.eyJ1IjoiYnVyYWthc2thbjIxIiwiYSI6ImNsYXFxNjY2YzAzdjMzb280YTVsMGUzYWQifQ.knfsQ7s0FiRYVpf5-yDGWQ";

// Sample data
const geoJson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
            },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [11.9746, 57.7089]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [11.9746, 52.7089]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [10.9746, 57.7089]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        }
    ]
};

//Method which routes to timetable page with selected clinicTitle
function selectAppointment(title) {

}

const Map = () => {

    const mapContainerRef = useRef(null);

    // Initialize map when component mounts
    useEffect(() => {
        //Actual map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [11.9746, 57.7089],
            zoom: 10,
        });

        // add markers to map
        for (const feature of geoJson.features) {
            // make a marker for each feature and add to the map
            new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${feature.properties.title}</h3>
                         <p>${feature.properties.description}</p>
                         <button type="button" class="btn btn-primary" onclick="selectAppointment(${feature.properties.title})">Book Appointment</button>`
                    )
            ).addTo(map);
        }
        // Clean up on unmount
        return () => map.remove();
    }, []);

    return (
        <div id="map-wrapper">
            <div className="map-container" ref={mapContainerRef} />
        </div>
    );
};

export default Map;