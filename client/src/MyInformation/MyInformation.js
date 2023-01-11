import './MyInformation.css'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import mqttHandler from "../common_components/MqttHandler";
import PrivateNavbar from "../common_components/PrivateNavbar";
import jwt from "jsonwebtoken";
import {useNavigate} from "react-router-dom";

export default function MyInformation() {
    let clinicDataFlag = useRef(true)
    const [changedValue, setChangedValue] = useState(false);
    const [client, setClient] = useState(null);
    const [currentClinic, setCurrentClinic] = useState({
        clinicInfoName: '',
        clinicInfoOwner: '',
        clinicInfoAddress: '',
        clinicInfoEmail: '',
        clinicInfoNewEmail: '',
        openingHoursMondayStart: '',
        openingHoursMondayEnd: '',
        openingHoursTuesdayStart: '',
        openingHoursTuesdayEnd: '',
        openingHoursWednesdayStart: '',
        openingHoursWednesdayEnd: '',
        openingHoursThursdayStart: '',
        openingHoursThursdayEnd: '',
        openingHoursFridayStart: '',
        openingHoursFridayEnd: '',
        openingHoursFikaHour: '',
        openingHoursLunchHour: ''
    });
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const sendMessage = useCallback((topic, json) => {
        if (client !== null) {
            clinicDataFlag.current = true
            client.publish(topic, JSON.stringify(json))
            setTimeout(() => {
                if (clinicDataFlag.current) {
                    navigate("/error");
                }
            }, 10000);
        } else {
            navigate("/error")
        }
    }, [client, navigate])

    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    /**
     * Navigates the user to the login page in case the user is not
     * authenticated to be on this page
     */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        return () => {
        };
    }, [navigate]);

    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#')
            const theClinic = jwt.decode(localStorage.token, 'something');
            sendMessage('getCurrentLoggedInClinic',
                {
                    clientId: client.options.clientId,
                    body: {
                        clinicId: theClinic._id
                    }
                }
            )

            client.on('message', async function (topic, message) {
                clinicDataFlag.current = false
                switch (topic) {
                    case client.options.clientId + '/editInfoResponse':
                        console.log(message.toString())
                        receivedMessage(message.toString())
                        break;
                    case client.options.clientId + '/changePasswordResponse':
                        console.log(message.toString())
                        receivedMessage(message.toString())
                        break;
                    case client.options.clientId + '/currentLoggedInClinicResponse':
                        const pmessage = JSON.parse(message)
                        if (pmessage.response !== null && pmessage.response === "failed") {

                        } else {
                            setCurrentClinic(currentClinic => ({
                                ...currentClinic,
                                clinicInfoName: pmessage.name,
                                clinicInfoOwner: pmessage.owner,
                                clinicInfoAddress: pmessage.address,
                                clinicInfoEmail: pmessage.email,
                                clinicInfoNewEmail: pmessage.email,
                                openingHoursMondayStart: pmessage.openingHours.monday.start,
                                openingHoursMondayEnd: pmessage.openingHours.monday.end,
                                openingHoursTuesdayStart: pmessage.openingHours.tuesday.start,
                                openingHoursTuesdayEnd: pmessage.openingHours.tuesday.end,
                                openingHoursWednesdayStart: pmessage.openingHours.wednesday.start,
                                openingHoursWednesdayEnd: pmessage.openingHours.wednesday.end,
                                openingHoursThursdayStart: pmessage.openingHours.thursday.start,
                                openingHoursThursdayEnd: pmessage.openingHours.thursday.end,
                                openingHoursFridayStart: pmessage.openingHours.friday.start,
                                openingHoursFridayEnd: pmessage.openingHours.friday.end,
                                openingHoursFikaHour: pmessage.fikaHour,
                                openingHoursLunchHour: pmessage.lunchHour
                            }))
                        }
                        break;
                    default:
                        break;
                }
            })
        }

        /**
         * Receives a message from the backend, parses it and sends it further to be alerted.
         * @param message response from backend
         */
        function receivedMessage(message) {
            const pMessage = JSON.parse(message)
            alert(pMessage)
        }

        return () => {
            if (client !== null) {
                console.log('ending process')
                client.end()
            }
        }
    }, [client, sendMessage])

    /**
     * A custom alert, which receives a message to be alerted.
     * @param message message to alert
     */
    const alert = (message) => {
        const alertPlaceholder = document.getElementById('alertPlaceholder')
        alertPlaceholder.style.display = "block"
        alertPlaceholder.innerHTML = message.text
        if (message.status === 200) {
            alertPlaceholder.style.backgroundColor = "#90ee90"
            alertPlaceholder.style.borderColor = "#023020";
            alertPlaceholder.style.color = "#023020";
        } else {
            alertPlaceholder.style.backgroundColor = "#FF9494";
            alertPlaceholder.style.borderColor = "#8b0000";
            alertPlaceholder.style.color = "#8b0000";
        }
    }
    /**
     * Changes the initial state of the variables when the user types in something, in order to keep
     * track of the user's input.
     * @param e Event object which contains the user input and field id.
     */
    const handleChanges = (e) => {
        const {id, value} = e.target;
        if (id === "passwordFormOldPassword") {
            setOldPassword(value);
        }
        if (id === "passwordFormPassword") {
            setPassword(value)
        }
        if (id === "passwordFormConfirmPassword") {
            setConfirmPassword(value)
        } else {
            setChangedValue(true)
            setCurrentClinic(currentClinic => ({
                ...currentClinic,
                [e.target.id]: e.target.value
            }))
        }
    }

    /**
     * Checks if the user's input is valid. E.g the email has a valid format and the opening hours are logical.
     * Then publishes a message to the backend, to swap the information of the clinic with the provided input..
     * @param event event object.
     */
    const submit = (event) => {
        if (currentClinic.openingHoursMondayStart > currentClinic.openingHoursMondayEnd ||
            currentClinic.openingHoursTuesdayStart > currentClinic.openingHoursTuesdayEnd ||
            currentClinic.openingHoursWednesdayStart > currentClinic.openingHoursWednesdayEnd ||
            currentClinic.openingHoursThursdayStart > currentClinic.openingHoursThursdayEnd ||
            currentClinic.openingHoursFridayStart > currentClinic.openingHoursFridayEnd) {
            event.preventDefault();
            const message = {
                text: "Start time should be before the end time in the opening hours."
            }
            alert(message);
        } else if (!/\S+@\S+\.\S+/.test(currentClinic.clinicInfoNewEmail) && currentClinic.clinicInfoNewEmail) {
            const email = document.getElementById("newEmail");
            email.setCustomValidity("Invalid email format")
        } else if (!changedValue) {
            event.preventDefault();
            const message = {
                text: "Nothing was changed!"
            }
            alert(message)
        } else {
            event.preventDefault();
            if (client !== null) {
                sendMessage('editInfo', {
                    id: client.options.clientId,
                    body: {
                        name: currentClinic.clinicInfoName,
                        owner: currentClinic.clinicInfoOwner,
                        address: currentClinic.clinicInfoAddress,
                        email: currentClinic.clinicInfoEmail,
                        newEmail: currentClinic.clinicInfoNewEmail,
                        openingHours: {
                            monday: {
                                start: currentClinic.openingHoursMondayStart,
                                end: currentClinic.openingHoursMondayEnd
                            },
                            tuesday: {
                                start: currentClinic.openingHoursTuesdayStart,
                                end: currentClinic.openingHoursTuesdayEnd
                            },
                            wednesday: {
                                start: currentClinic.openingHoursWednesdayStart,
                                end: currentClinic.openingHoursWednesdayEnd
                            },
                            thursday: {
                                start: currentClinic.openingHoursThursdayStart,
                                end: currentClinic.openingHoursThursdayEnd
                            },
                            friday: {
                                start: currentClinic.openingHoursFridayStart,
                                end: currentClinic.openingHoursFridayEnd
                            },
                            lunchHour: currentClinic.openingHoursLunchHour,
                            fikaHour: currentClinic.openingHoursFikaHour
                        }
                    }
                })
            }
        }
    }
    /**
     * Checks that the user has written valid passwords that conform to the rules (at least 8 characters, 1 letter, 1 number)
     * Then publishes a message to the backend as a request to change the clinic's password to the newly provided one.
     * @param event event object.
     */
    const changePassword = (event) => {
        if (password.length < 8) {
            document.getElementById("password").setCustomValidity("Password contain at least 8 characters!");
        } else if (!/\d/.test(password) || !/[a-zA-Z]/g.test(password)) {
            document.getElementById("password").setCustomValidity("Password contain at least 1 letter and 1 number!");
        } else if (password !== confirmPassword) {
            document.getElementById("confirmPassword").setCustomValidity("Passwords do not match!");
        } else {
            event.preventDefault();
            if (client !== null) {
                sendMessage('changePassword', {
                        id: client.options.clientId,
                        body: {
                            email: currentClinic.clinicInfoEmail,
                            password: password,
                            oldPassword: oldPassword
                        }
                    }
                )
            }
        }
    }
    return (
        <div>
            <PrivateNavbar/>
            <div className={"profileContainer"}>
                <div id="alertPlaceholder"></div>
                <div className="leftBox">
                    <form className="clinicInfo">
                        <h2 id={"clinicHeader2"}> My Information </h2>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="Name"
                                name="clinicInfoForm"
                                id={"clinicInfoName"}
                                value={currentClinic.clinicInfoName}
                                style={{color: "black", letterSpacing: "normal", fontFamily: "intel"}}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label htmlFor={"clinicInfoName"}> Clinic's name </label>
                        </div>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="Owner"
                                name="clinicInfoForm"
                                id={"clinicInfoOwner"}
                                value={currentClinic.clinicInfoOwner}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label htmlFor="clinicInfoOwner"> Clinic's owner </label>
                        </div>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="Address"
                                name="clinicInfoForm"
                                id={"clinicInfoAddress"}
                                value={currentClinic.clinicInfoAddress}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label htmlFor="clinicInfoAddress"> Clinic's Address </label>
                        </div>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="name@example.com"
                                name="clinicInfoForm"
                                id={"clinicInfoNewEmail"}
                                value={currentClinic.clinicInfoNewEmail}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label htmlFor="clinicInfoNewEmail"> Email address </label>
                        </div>
                        <button className={"informationButton"} onClick={(e) => submit(e)}>
                            Change info
                        </button>
                    </form>
                    <form className="openingHours">
                        <h3 id={"hoursHeader"}> Opening hours </h3>
                        <label className={"day"}> Monday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursMondayStart"}
                                value={currentClinic.openingHoursMondayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursMondayEnd"}
                                value={currentClinic.openingHoursMondayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Tuesday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursTuesdayStart"}
                                value={currentClinic.openingHoursTuesdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursTuesdayEnd"}
                                value={currentClinic.openingHoursTuesdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Wednesday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursWednesdayStart"}
                                value={currentClinic.openingHoursWednesdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursWednesdayEnd"}
                                value={currentClinic.openingHoursWednesdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Thursday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursThursdayStart"}
                                value={currentClinic.openingHoursThursdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursThursdayEnd"}
                                value={currentClinic.openingHoursThursdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Friday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursFridayStart"}
                                value={currentClinic.openingHoursFridayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="openingHoursForm"
                                id={"openingHoursFridayEnd"}
                                value={currentClinic.openingHoursFridayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <div className="day"><h3 id={"hoursHeader"}> Break Hours </h3></div>
                        <label> Fika: </label>
                        <input
                            className="informationInput"
                            type="time"
                            name="openingHoursForm"
                            id={"openingHoursFikaHour"}
                            value={currentClinic.openingHoursFikaHour}
                            onChange={(e) => handleChanges(e)}
                        />
                        <label> Lunch: </label>
                        <input
                            className="informationInput"
                            type="time"
                            name="openingHoursForm"
                            id={"openingHoursLunchHour"}
                            value={currentClinic.openingHoursLunchHour}
                            onChange={(e) => handleChanges(e)}
                        />
                        <button id={"otherButton"} onClick={() => submit()}>
                            Update information
                        </button>
                    </form>
                </div>
                <form className="passwordChanging" id={"form2"}>
                    <h2 id={"clinicHeader2"}> Change password </h2>
                    <div className="form-floating informationInputContainer">
                        <input required
                               type="password"
                               className="form-control informationInput"
                               placeholder="Password"
                               name="passwordForm"
                               id={"passwordFormOldPassword"}
                               value={oldPassword}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="passwordFormOldPassword"> Old password </label>
                    </div>
                    <div className="form-floating informationInputContainer">
                        <input required
                               type="password"
                               className="form-control informationInput"
                               placeholder="Password"
                               name="passwordForm"
                               id={"passwordFormPassword"}
                               value={password}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="passwordFormPassword"> New password </label>
                    </div>
                    <div className="form-floating informationInputContainer">
                        <input required
                               type="password"
                               className="form-control informationInput"
                               placeholder="Password"
                               name="passwordForm"
                               id={"passwordFormConfirmPassword"}
                               value={confirmPassword}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="passwordFormConfirmPassword"> Confirm password </label>
                    </div>
                    <label id={"passwordError"}> </label> <br/>
                    <button className={"informationButton"} onClick={(e) => changePassword(e)}>
                        Change password
                    </button>
                </form>
            </div>
        </div>
    )
}