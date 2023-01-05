import './MyInformation.css'
import React, {useEffect, useState} from 'react';
import mqttHandler from "../common_components/MqttHandler";
import PrivateNavbar from "../common_components/PrivateNavbar";
import jwt from "jsonwebtoken";
import {useNavigate} from "react-router-dom";

export function MyInformation() {
    const [changedValue, setChangedValue] = useState(false);
    const [client, setClient] = useState(null);
    const [currentClinic, setCurrentClinic] = useState({
        name: '',
        owner: '',
        address: '',
        email: '',
        newEmail: '',
        mondayStart: '',
        mondayEnd: '',
        tuesdayStart: '',
        tuesdayEnd: '',
        wednesdayStart: '',
        wednesdayEnd: '',
        thursdayStart: '',
        thursdayEnd: '',
        fridayStart: '',
        fridayEnd: '',
        fikaHour: '',
        lunchHour: ''
    });
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    /**
     * Navigates the user to the log in page in case the user is not
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
            client.publish('getCurrentLoggedInClinic', JSON.stringify(
                {
                    id: client.options.clientId,
                    body: {
                        clinicID: theClinic._id
                    }
                }
            ))

            client.on('message', async function (topic, message) {
                switch (topic) {
                    case client.options.clientId + '/editInfoResponse':
                        receivedMessage(message.toString())
                        break;
                    case client.options.clientId + '/changePasswordResponse':
                        receivedMessage(message.toString())
                        break;
                    case client.options.clientId + '/currentLoggedInClinicResponse':
                        console.log(JSON.parse(message))
                        const pmessage = JSON.parse(message)
                        setCurrentClinic(formData => ({
                            ...currentClinic,
                            name: pmessage.name,
                            owner: pmessage.owner,
                            address: pmessage.address,
                            email: pmessage.email,
                            newEmail: pmessage.email,
                            mondayStart: pmessage.openingHours.monday.start,
                            mondayEnd: pmessage.openingHours.monday.end,
                            tuesdayStart: pmessage.openingHours.tuesday.start,
                            tuesdayEnd: pmessage.openingHours.tuesday.end,
                            wednesdayStart: pmessage.openingHours.wednesday.start,
                            wednesdayEnd: pmessage.openingHours.wednesday.end,
                            thursdayStart: pmessage.openingHours.thursday.start,
                            thursdayEnd: pmessage.openingHours.thursday.end,
                            fridayStart: pmessage.openingHours.friday.start,
                            fridayEnd: pmessage.openingHours.friday.end,
                            fikaHour: pmessage.fikaHour,
                            lunchHour: pmessage.lunchHour
                        }))
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
    }, [client, currentClinic])

    useEffect(() => {
        console.log(currentClinic)
        console.log(currentClinic.name)
    }, [currentClinic])

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
        //let theTime = String; Was not used so I commented it out to stop lint complaint - Askan
        const {id, value} = e.target;
        if (id === "oldPassword") {
            setOldPassword(value);
        }
        if (id === "password") {
            setPassword(value)
        }
        if (id === "confirmPassword") {
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
        if (currentClinic.mondayStart > currentClinic.mondayEnd || currentClinic.tuesdayStart > currentClinic.tuesdayEnd
            || currentClinic.wednesdayStart > currentClinic.wednesdayEnd || currentClinic.thursdayStart > currentClinic.thursdayEnd || currentClinic.fridayStart > currentClinic.fridayEnd) {
            event.preventDefault();
            const message = {
                text: "Start time should be before the end time in the opening hours."
            }
            alert(message);
        } else if (!/\S+@\S+\.\S+/.test(currentClinic.newEmail) && currentClinic.newEmail) {
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
                client.publish('editInfo', JSON.stringify(
                    {
                        id: client.options.clientId,
                        body: {
                            name: currentClinic.name,
                            owner: currentClinic.owner,
                            address: currentClinic.address,
                            email: currentClinic.email,
                            newEmail: currentClinic.newEmail,
                            openingHours: {
                                monday: {
                                    start: currentClinic.mondayStart,
                                    end: currentClinic.mondayEnd
                                },
                                tuesday: {
                                    start: currentClinic.tuesdayStart,
                                    end: currentClinic.tuesdayEnd
                                },
                                wednesday: {
                                    start: currentClinic.wednesdayStart,
                                    end: currentClinic.wednesdayEnd
                                },
                                thursday: {
                                    start: currentClinic.thursdayStart,
                                    end: currentClinic.thursdayEnd
                                },
                                friday: {
                                    start: currentClinic.fridayStart,
                                    end: currentClinic.fridayEnd
                                },
                            },
                            lunchHour: currentClinic.lunchHour,
                            fikaHour: currentClinic.fikaHour
                        },
                    }
                ))
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
                client.publish('changePassword', JSON.stringify(
                    {
                        id: client.options.clientId,
                        body: {
                            email: currentClinic.email,
                            password: password,
                            oldPassword: oldPassword
                        }
                    }
                ))
            }
        }
    }
    return (
        <>
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
                                name="name"
                                id={"name"}
                                value={currentClinic.name}
                                style={{color: "black", letterSpacing: "normal", fontFamily: "intel"}}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="name"> Clinic's name </label>
                        </div>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="Owner"
                                name="owner"
                                id={"owner"}
                                value={currentClinic.owner}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="owner"> Clinic's owner </label>
                        </div>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="Address"
                                name="address"
                                id={"address"}
                                value={currentClinic.address}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="address"> Clinic's Address </label>
                        </div>
                        <div className="form-floating informationInputContainer">
                            <input
                                type="text"
                                className="form-control informationInput"
                                placeholder="name@example.com"
                                name="email"
                                id={"newEmail"}
                                value={currentClinic.newEmail}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="email"> Email address </label>
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
                                name="mondayStart"
                                id={"mondayStart"}
                                value={currentClinic.mondayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="mondayEnd"
                                id={"mondayEnd"}
                                value={currentClinic.mondayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Tuesday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="tuesdayStart"
                                id={"tuesdayStart"}
                                value={currentClinic.tuesdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="tuesdayEnd"
                                id={"tuesdayEnd"}
                                value={currentClinic.tuesdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Wednesday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="wednesdayStart"
                                id={"wednesdayStart"}
                                value={currentClinic.wednesdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="wednesdayEnd"
                                id={"wednesdayEnd"}
                                value={currentClinic.wednesdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Thursday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="thursdayStart"
                                id={"thursdayStart"}
                                value={currentClinic.thursdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="thursdayEnd"
                                id={"thursdayEnd"}
                                value={currentClinic.thursdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Friday <br/>
                            <label> Start: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="fridayStart"
                                id={"fridayStart"}
                                value={currentClinic.fridayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                className="informationInput"
                                type="time"
                                name="fridayEnd"
                                id={"fridayEnd"}
                                value={currentClinic.fridayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <form className="breakHours">
                            <label className="day"><h3 id={"hoursHeader"}> Break Hours </h3>
                                <label> Fika: </label>
                                <input
                                    className="informationInput"
                                    type="time"
                                    name="fikaHour"
                                    id={"fikaHour"}
                                    value={currentClinic.fikaHour}
                                    onChange={(e) => handleChanges(e)}
                                />
                                <label> Lunch: </label>
                                <input
                                    className="informationInput"
                                    type="time"
                                    name="lunchHour"
                                    id={"lunchHour"}
                                    value={currentClinic.lunchHour}
                                    onChange={(e) => handleChanges(e)}
                                />
                            </label>
                        </form>
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
                               name="password"
                               id={"oldPassword"}
                               value={oldPassword}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label for="oldPassword"> Old password </label>
                    </div>
                    <div className="form-floating informationInputContainer">
                        <input required
                               type="password"
                               className="form-control informationInput"
                               placeholder="Password"
                               name="password"
                               id={"password"}
                               value={password}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label for="password"> New password </label>
                    </div>
                    <div className="form-floating informationInputContainer">
                        <input required
                               type="password"
                               className="form-control informationInput"
                               placeholder="Password"
                               name="confirmPassword"
                               id={"confirmPassword"}
                               value={confirmPassword}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label for="confirmPassword"> Confirm password </label>
                    </div>
                    <label id={"passwordError"}> </label> <br/>
                    <button className={"informationButton"} onClick={(e) => changePassword(e)}>
                        Change password
                    </button>
                </form>
            </div>
        </>
    )
}