import "./EditDentists.css";
import DentistCard from "../common_components/DentistCard";
import PrivateNavbar from "../common_components/PrivateNavbar";
import React, {useEffect, useState} from "react";

//option 1
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

//option 2
/*
useEffect(() => {
    if (client !== null) {
        client.subscribe(client.options.clientId + '/#')

        client.on('message', function (topic, message) {
            switch (topic) {
                case client.options.clientId + '/editInfoResponse':
                    receivedMessage(message.toString())
                    break;
                case client.options.clientId + '/changePasswordResponse':
                    receivedMessage(message.toString())
                    break;
                default:
                    break;
            }
        })
    }


    function receivedMessage(message) {
        console.log(message)
        const pMessage = JSON.parse(message)
        console.log(pMessage.status)
        alert(pMessage)
    }

    return () => {
        if (client !== null) {
            console.log('ending process')
            client.end()
        }
    }
}, [client]);
*/

export default function EditDentists() {
    const [dentists, setDentists] = useState([]);

    useEffect(() => {
        async function fetchDentists() {
            const response = await fetch('/api/dentists');
            const data = await response.json();
            setDentists(data.dentists);
        }
        fetchDentists();
    }, []);

    return(
        <>
            <PrivateNavbar/>
            <h1 className="info">
                Dentist's registered at Clinic
            </h1>
                <div className="dentists">
                    {dentists.map(dentist => (
                        <DentistCard
                            key={dentist.id}
                            name={dentist.name}
                            email={dentist.email}
                            PhoneNumber={dentist.PhoneNumber}
                            workweek={dentist.workweek} // passes the workweek array as a prop
                        />
                    ))}
                </div>
        </>
    )
}
