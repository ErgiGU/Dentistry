//import './MyInformation.css'
import React, {useEffect, useState} from 'react';
import mqttHandler from "../common_components/MqttHandler";

export function MyInformation() {
    const [client, setClient] = useState(null);
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mondayStart, setMondayStart] = useState("");
    const [mondayEnd, setMondayEnd] = useState("");
    const [tuesdayStart, setTuesdayStart] = useState("");
    const [tuesdayEnd, setTuesdayEnd] = useState("");
    const [wednesdayStart, setWednesdayStart] = useState("");
    const [wednesdayEnd, setWednesdayEnd] = useState("");
    const [thursdayStart, setThursdayStart] = useState("");
    const [thursdayEnd, setThursdayEnd] = useState("");
    const [fridayStart, setFridayStart] = useState("");
    const [fridayEnd, setFridayEnd] = useState("");
    const [fikaHour, setFikaHour] = useState("");
    const [lunchHour, setLunchHour] = useState("");

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
    }, [client]);

    /**
     * A custom alert, which receives a message to be alerted.
     * @param message message to alert
     */
    const alert = (message) => {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
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
     * This will be connected to the backend, to get the current state of the clinic's information
     * and display them in the form.
     */
        // eslint-disable-next-line no-unused-vars
    const setInitialStates = () => {

        }
    /**
     * Changes the initial state of the variables when the user types in something, in order to keep
     * track of the user's input.
     * @param e Event object which contains the user input and field id.
     */
    const handleChanges = (e) => {
        let theTime = String;
        const {id, value} = e.target;
        if (id === "name") {
            setName(value);
        }
        if (id === "owner") {
            setOwner(value);
        }
        if (id === "address") {
            setAddress(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "oldPassword") {
            setOldPassword(value);
        }
        if (id === "password") {
            setPassword(value)
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value)
        }
        if (id === "mondayStart") {
            theTime = value.toString();
            setMondayStart(theTime);
        }
        if (id === "mondayEnd") {
            theTime = value.toString();
            setMondayEnd(theTime);
        }
        if (id === "tuesdayStart") {
            theTime = value.toString();
            setTuesdayStart(theTime);
        }
        if (id === "tuesdayEnd") {
            theTime = value.toString();
            setTuesdayEnd(theTime);
        }
        if (id === "wednesdayStart") {
            theTime = value.toString();
            setWednesdayStart(theTime);
        }
        if (id === "wednesdayEnd") {
            theTime = value.toString();
            setWednesdayEnd(theTime);
        }
        if (id === "thursdayStart") {
            theTime = value.toString();
            setThursdayStart(theTime)
        }
        if (id === "thursdayEnd") {
            theTime = value.toString();
            setThursdayEnd(theTime)
        }
        if (id === "fridayStart") {
            theTime = value.toString();
            setFridayStart(theTime)
        }
        if (id === "fridayEnd") {
            theTime = value.toString();
            setFridayEnd(theTime)
        }
        if (id === "fikaHour") {
            theTime = value.toString();
            setFikaHour(theTime)
        }
        if (id === "lunchHour") {
            theTime = value.toString();
            setLunchHour(theTime)
        }

    }
    /**
     * Checks if the user's input is valid. E.g the email has a valid format and the opening hours are logical.
     * Then publishes a message to the backend, to swap the information of the clinic with the provided input..
     * @param event event object.
     */
    const submit = (event) => {
        if (mondayStart > mondayEnd || tuesdayStart > tuesdayEnd || wednesdayStart > wednesdayEnd || thursdayStart > thursdayEnd || fridayStart > fridayEnd) {
            event.preventDefault();
            const message = {
                text: "Start time should be before the end time in the opening hours."
            }
            alert(message);
        } else if (!/\S+@\S+\.\S+/.test(email) && email) {
            const email = document.getElementById("email");
            email.setCustomValidity("Invalid email format")
        } else {
            event.preventDefault();
            if (!(name || owner || address || email || mondayStart || tuesdayStart || wednesdayStart || thursdayStart || fridayStart)) {
                const message = {
                    text: "Can not change empty fields!"
                }
                alert(message)
            } else {
                if (client !== null) {
                    client.publish('editInfo', JSON.stringify(
                        {
                            id: client.options.clientId,
                            body: {
                                name: name,
                                owner: owner,
                                address: address,
                                email: 'modify@hotmail.se',
                                newEmail: email,
                                openingHours: {
                                    monday: {
                                        start: mondayStart,
                                        end: mondayEnd
                                    },
                                    tuesday: {
                                        start: tuesdayStart,
                                        end: tuesdayEnd
                                    },
                                    wednesday: {
                                        start: wednesdayStart,
                                        end: wednesdayEnd
                                    },
                                    thursday: {
                                        start: thursdayStart,
                                        end: thursdayEnd
                                    },
                                    friday: {
                                        start: fridayStart,
                                        end: fridayEnd
                                    },
                                },
                                lunchHour: lunchHour,
                                fikaHour: fikaHour
                            },
                        }
                    ))
                }
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
                            email: "modify@hotmail.se",
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
        
            <div className={"container"}>
                <div id="liveAlertPlaceholder"></div>
                <div className="leftBox">
                    <form className="clinicInfo">
                        <h2> My Information </h2>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                id={"name"}
                                value={name}
                                style={{color: "black"}}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="name"> Clinic's name </label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Owner"
                                name="owner"
                                id={"owner"}
                                value={owner}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="owner"> Clinic's owner </label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                id={"address"}
                                value={address}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="address"> Clinic's Address </label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name@example.com"
                                name="email"
                                id={"email"}
                                value={email}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label for="email"> Email address </label>
                        </div>
                        <button className={"button"} onClick={(e) => submit(e)}>
                            Change info
                        </button>
                    </form>
                    <form className="openingHours">
                        <h3 id={"openingHoursID"}> Opening hours </h3>
                        <label className={"day"}> Monday <br/>
                            <label> Start: </label>
                            <input
                                type="time"
                                name="mondayStart"
                                id={"mondayStart"}
                                value={mondayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                type="time"
                                name="mondayEnd"
                                id={"mondayEnd"}
                                value={mondayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Tuesday <br/>
                            <label> Start: </label>
                            <input
                                type="time"
                                name="tuesdayStart"
                                id={"tuesdayStart"}
                                value={tuesdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                type="time"
                                name="tuesdayEnd"
                                id={"tuesdayEnd"}
                                value={tuesdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Wednesday <br/>
                            <label> Start: </label>
                            <input
                                type="time"
                                name="wednesdayStart"
                                id={"wednesdayStart"}
                                value={wednesdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                type="time"
                                name="wednesdayEnd"
                                id={"wednesdayEnd"}
                                value={wednesdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Thursday <br/>
                            <label> Start: </label>
                            <input
                                type="time"
                                name="thursdayStart"
                                id={"thursdayStart"}
                                value={thursdayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                type="time"
                                name="thursdayEnd"
                                id={"thursdayEnd"}
                                value={thursdayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                        <label className={"day"}> Friday <br/>
                            <label> Start: </label>
                            <input
                                type="time"
                                name="fridayStart"
                                id={"fridayStart"}
                                value={fridayStart}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label> End: </label>
                            <input
                                type="time"
                                name="fridayEnd"
                                id={"fridayEnd"}
                                value={fridayEnd}
                                onChange={(e) => handleChanges(e)}
                            />
                        </label>
                    </form>
                    <form className="breakHours">
                        <h3> Break hours </h3>
                        <label> Fika hour </label> <br/>
                        <input
                            type="time"
                            name="fikaHour"
                            id={"fikaHour"}
                            value={fikaHour}
                            onChange={(e) => handleChanges(e)}
                        /> <br/>
                        <label> Lunch hour </label> <br/>
                        <input
                            type="time"
                            name="lunchHour"
                            id={"lunchHour"}
                            value={lunchHour}
                            onChange={(e) => handleChanges(e)}
                        />
                    </form>
                    <button id={"otherButton"} onClick={() => submit()}>
                        Change info
                    </button>
                </div>
                <form className="passwordChanging" id={"form2"}>
                    <h2> Change password </h2>
                    <div className="form-floating">
                        <input required
                               type="password"
                               className="form-control"
                               placeholder="Password"
                               name="password"
                               id={"oldPassword"}
                               value={oldPassword}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label for="oldPassword"> Old password </label>
                    </div>
                    <div className="form-floating">
                        <input required
                               type="password"
                               className="form-control"
                               placeholder="Password"
                               name="password"
                               id={"password"}
                               value={password}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label for="password"> New password </label>
                    </div>
                    <div className="form-floating">
                        <input required
                               type="password"
                               className="form-control"
                               placeholder="Password"
                               name="confirmPassword"
                               id={"confirmPassword"}
                               value={confirmPassword}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label for="confirmPassword"> Confirm password </label>
                    </div>
                    <label id={"passwordError"}> </label> <br/>
                    <button className={"button"} onClick={(e) => changePassword(e)}>
                        Change password
                    </button>
                </form>
            </div>
        </>
    )
}