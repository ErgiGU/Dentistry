import './Home.css'
import React, {useEffect, useState} from 'react';
import mqttHandler from "../common_components/MqttHandler";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const [client, setClient] = useState(null);
    const [response, setResponse] = useState('')

    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#')

            client.on('message', function (topic, message) {
                switch (topic) {
                    case client.options.clientId + '/appointmentResponse':
                        receivedMessage(message)
                        break;
                    default:
                        break;
                }
            })
        }

        return () => {
            if (client !== null) {
                console.log('ending process')
                client.end()
            }
        }
    }, [client])

    function receivedMessage(message) {
        // setState or whatever function is needed to visually confirm result of backend call
        console.log(message.toString())
        setResponse(message.toString())
    }

    function handleClick() {
        navigate('/')
    }

    // All messages need to contain an id and a body
    function sendMessage() {
        if (client !== null) {
            client.publish('login', JSON.stringify(
                {
                    id:client.options.clientId,
                    body: {
                        username: 'user1',
                        password: '2001-01-01'
                    }
                }
            ))
        }
    }

    return (
        <>
            <h1>Testing</h1>
            <div className={"btn btn-primary"} onClick={handleClick}>Test</div>
            <div className={"btn btn-primary"} onClick={sendMessage}>Send message</div>
            <h2>{response}</h2>
        </>
    );
}

export default Home;