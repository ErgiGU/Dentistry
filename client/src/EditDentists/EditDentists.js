import "./EditDentists.css";
import DentistCard from "../common_components/DentistCard";
import PrivateNavbar from "../common_components/PrivateNavbar";
import React, {useEffect, useState} from "react";
import mqttHandler from "../common_components/MqttHandler";


export default function ViewDentists () {


const [dentists, setDentists] = useState([]);
    const [client, setClient] = useState(null);

useEffect(() => {
    if (client === null) {
        setClient(mqttHandler.getClient(client))
    }
}, [client])

    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#')
            client.publish('getDentists', JSON.stringify({
                id: client.options.clientId,
                body: {
                    clinicID: "63b5c6377cb8fcdbcaa3939c"
                }
            }))
            client.on('message', function (topic, message) {
                switch (topic) {
                    case client.options.clientId + '/getDentistsResponse':
                        console.log(JSON.parse(message))
                        const pMessage = JSON.parse(message)
                        setDentists(pMessage)
                        break;

                    default:
                        (new Error("The wrong message is received"))
                        break;
                }
            })
        }
        return () => {
            if (client !== null) {
                console.log("ending process");
                client.end()
            }
        }
    }, [client]);




        return (
            <>
                <PrivateNavbar/>
                <h1 className="info">
                    Dentist's registered at Clinic
                </h1>
                <div className="dentists">
                    {Array.from(dentists).map((dentist) => (
                        <DentistCard
                            key={dentist.id}
                            name={dentist.name}
                            email={dentist.email}
                            PhoneNumber={dentist.phoneNumber}
                            workweek={dentist.workWeek} // passes the workweek array as a prop
                        />
                    ))}
                </div>
            </>
        )
    }

