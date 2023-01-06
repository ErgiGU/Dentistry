import React, {useEffect, useState} from "react";
import "./ClinicsMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mqttHandler from "../common_components/MqttHandler";
import Map from "./ClinicsMap"


export default function MapsParent() {

    const [client, setClient] = useState(null);

    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    return (
        <div>
            {client && <Map client={client}/>}
        </div>
    );
}