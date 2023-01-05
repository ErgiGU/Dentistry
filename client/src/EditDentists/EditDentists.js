import "./EditDentists.css";
import DentistCard from "../common_components/DentistCard";
import PrivateNavbar from "../common_components/PrivateNavbar";
import React from "react";


/*
useEffect(() => {
    if (client === null) {
        setClient(mqttHandler.getClient(client))
    }
}, [client])

useEffect(() => {
    if (client !== null) {
        client.subscribe(client.options.clientId + '/#');
        client.on('message', function (topic, message) {
            const intermediary = message.toString();
            switch (topic) {
                case client.options.clientId + "/checkEmail":
            }
                    return () => {
                        if (client !== null) {
                            console.log("ending process");
                            client.end()
                        }
                    }
            }, [alertPlaceholder, client, email, navigate])}})
 */

export default function EditDentists() {
    return(
        <>
            <PrivateNavbar/>
            <h1 className="info">
                Dentist's registered at Clinic
            </h1>
            <div className="dentists">
                <DentistCard/>
            </div>
        </>
    )
}
