import React, {useEffect, useState} from 'react';
import "./EditEmployee.css"


const Modal = ({ open, onClose, dentist }) => {

    const { id, name, workweek } = dentist;

    const [client, setClient] = useState(null);
    const [setMonday, setSetMonday] = useState(workweek.monday);
    const [setTuesday, setSetTuesday] = useState(workweek.tuesday);
    const [setWednesday, setSetWednesday] = useState(workweek.wednesday);
    const [setThursday, setSetThursday] = useState(workweek.thursday);
    const [setFriday, setSetFriday] = useState(workweek.friday);
    const [setSaturday, setSetSaturday] = useState(workweek.saturday);
    const [setSunday, setSetSunday] = useState(workweek.sunday);

    useEffect(() => {
        setSetMonday(workweek.monday);
        setSetTuesday(workweek.tuesday);
        setSetWednesday(workweek.wednesday);
        setSetThursday(workweek.thursday);
        setSetFriday(workweek.friday);
        setSetSaturday(workweek.saturday);
        setSetSunday(workweek.sunday);
    }, [workweek]);

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
        Saturday: workweek.saturday,
        Sunday: workweek.sunday
    });

    if (!open) return null;


    /**
     * sends a message containing the updated information of the dentist workweek after a user changes it.
     * @param event Event object which contains the user input and field id.
     */

    const submit = (event) => {
        if (client !== null) {
            client.publish("editInfo", JSON.stringify({
                id: client.options.clientId,
                body: {
                    id: id,
                    workweek: {
                        monday: setMonday,
                        tuesday: setTuesday,
                        wednesday: setWednesday,
                        thursday: setThursday,
                        friday: setFriday,
                        saturday: setSaturday,
                        sunday: setSunday
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
