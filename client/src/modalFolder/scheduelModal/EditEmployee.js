import React, {useEffect, useState} from 'react';
import "./EditEmployee.css"
import mqttHandler from "../../common_components/MqttHandler";


const Modal = ({id, open, onClose, name, workweek}) => {


    const [client, setClient] = useState(null);
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
                switch (topic) {
                    case client.options.clientId + '/setDentistScheduleResponse':
                        console.log(JSON.parse(message))
                        const pMessage = JSON.parse(message)
                        alert(pMessage.text)
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


    /**
     * sends a message containing the updated information of the dentist workweek after a user changes it.
     * @param event Event object which contains the user input and field id.
     */

    const submit = (event) => {
        if (client !== null) {
            client.publish("setDentistSchedule", JSON.stringify({
                id: client.options.clientId,
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
            }));
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
        <div onClick={onClose} className='scheduleOverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='scheduleModalContainer'
            >
                <div className='scheduleModalRight'>

                    <div className='scheduleContent'>
                        <h1>Working days of {name}</h1>
                        <button type={"button"} className='scheduleBtn-close btnOutline' onClick={onClose}></button>
                    </div>
                    <div className='scheduleBtnContainer'>
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
                        <h4>saturday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Friday}
                            onChange={() => handleToggle("Saturday")}
                        />
                        <h4>sunday</h4>
                        <input
                            type="checkbox"
                            checked={toggles.Friday}
                            onChange={() => handleToggle("sunday")}
                        />
                    </div>
                </div>
                <div className="scheduleNoteAndConfirm">
                    <h5>
                        NOTE: this is a running calender,
                        it will display the same hours from week to week if no changes are made.
                        If your schedule changes please update this calender.
                    </h5>
                    <button
                        className={"scheduleConfirmBtn"}
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
