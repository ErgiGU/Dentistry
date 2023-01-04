import React from 'react';
import Map from './map_components/ClinicsMap';
import NavigationBar from "../common_components/navigationBar";

export default function MapPage() {
    return (
        <div>
            <NavigationBar/>
            <Map />
        </div>
    );
}