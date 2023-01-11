import React, {useEffect, useRef, useState} from 'react';
import "./EditEmployee.css"
import {useNavigate} from "react-router-dom";
import mqttHandler from "../../../common_components/MqttHandler";


const Modal = ({id, open, onClose, name, workweek}) => {


    const navigate = new useNavigate()
    const [client, setClient] = useState(null);
    let clinicDataBackend = useRef(true)
    /**
     * provides the starting positions for the workweek toggles and updates them when the user changes them.
     * @param toggles Event object which contains the user input and field id.
     */

    const [toggles, setToggles] = useState({
        Monday: workweek.monday,
        Tuesday: workweek.tuesday,
        Wednesday: workweek.wednesday,
        Thursday: workweek.thursday,
        Friday: workweek.friday,
    });

    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#')
            client.on('message', function (topic, message) {
                clinicDataBackend.current = false
                switch (topic) {
                    case client.options.clientId + '/setDentistScheduleResponse':
                        console.log(JSON.parse(message))
                        const pMessage = JSON.parse(message)
                        alert(pMessage.text)
                        break;
                    default:
                        console.log("Wrong message has been received.")
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

    if (!open) return null;

    function sendMessage(topic, json) {
        if (client !== null) {
            clinicDataBackend.current = true
            client.publish(topic, JSON.stringify(json))
            setTimeout(() => {
                if (clinicDataBackend.current) {
                    navigate("/error");
                }
            }, 10000);

        } else {
            navigate("/error")
        }
    }

    /**
     * sends a message containing the updated information of the dentist workweek after a user changes it.
     * @param event Event object which contains the user input and field id.
     */

    const submit = (event) => {
        if (client !== null) {
            sendMessage("setDentistSchedule", {
                clientId: client.options.clientId,
                body: {
                    id: id,
                    workweek: {
                        monday: toggles.Monday,
                        tuesday: toggles.Tuesday,
                        wednesday: toggles.Wednesday,
                        thursday: toggles.Thursday,
                        friday: toggles.Friday
                    }
                }
            })
        }
    }

    /**
     * responsible for actually changing the toggles that toggles useState brings in.
     */

    const handleToggle = day => {
        setToggles({
            ...toggles,
            [day]: !toggles[day]
        });
    };

    return (
        <div onClick={onClose} id='scheduleOverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                id='scheduleModalContainer'
            >
                <div id='scheduleModalRight'>

                    <div id='scheduleContent'>
                        <h1>Working days of {name}</h1>
                        <button type={"button"} id='scheduleBtn-close' onClick={onClose}>X</button>
                    </div>
                    <div id='scheduleBtnContainer'>
                        <h4>monday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Monday}
                            onChange={() => handleToggle("Monday")}
                        />
                        <h4>tuesday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Tuesday}
                            onChange={() => handleToggle("Tuesday")}
                        />
                        <h4>wednesday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Wednesday}
                            onChange={() => handleToggle("Wednesday")}
                        />
                        <h4>thursday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Thursday}
                            onChange={() => handleToggle("Thursday")}
                        />
                        <h4>friday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Friday}
                            onChange={() => handleToggle("Friday")}
                        />
                    </div>
                </div>
                <div id="scheduleNoteAndConfirm">
                    <h5>
                        NOTE: this is a running calender,
                        it will display the same hours from week to week if no changes are made.
                        If your schedule changes please update this calender.
                    </h5>
                    <button
                        id={"scheduleConfirmBtn"}
                        onClick={e => {
                            onClose();
                            submit(e);
                        }}
                    >
                        Change info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
