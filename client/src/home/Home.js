// Example homepage
import React from 'react';

export default function Home() {

    // Boilerplate sendMessage method
    function sendMessage(topic, message) {
        console.log('Sending ' + message + ' to ' + topic)
    }

    return (
        <>
            <h1>Testing</h1>
            <div className={"btn btn-primary"} onClick={() => sendMessage('test', 'testMessage')}>Test</div>
        </>
    )
}