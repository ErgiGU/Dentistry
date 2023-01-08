import React, {useEffect, useState} from 'react';
import "./DentistModal.css"
import mqttHandler from "../../common_components/MqttHandler";
import jwt from "jsonwebtoken";

//in case needed bootstrap template

//<BootstrapSwitchButton
//checked={false}
//onlabel='Admin User'
//offlabel='Regular User'
//onChange={(checked: boolean) => {
//  this.setState({ isUserAdmin: checked })
//}}
///>


const Modal = ({ open, onClose, name, email, phoneNumber, id}) => {

    const [client, setClient] = useState(null);
    const [currentName, setCurrentName] = useState(name);
    const [phone, setPhone] = useState(phoneNumber);
    const [currentEmail, setCurrentEmail] = useState(email);

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
                    case client.options.clientId + '/editDentistInfoResponse':
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
    /**
     * Changes the initial state of the variables when the user changes in something, in order to keep
     * track of the user's input.
     * @param e Event object which contains the user input and field id.
     */
    const handleChanges = (e) => {
        const {id, value} = e.target;
        if (id === "name") {
            setCurrentName(value);
        }
        if (id === "phone") {
            setPhone(value);
        }
        if (id === "email") {
            setCurrentEmail(value);
        }
    }

    /**
     * Checks if the user's input is valid. E.g. the email has a valid format.
     * Then publishes a message to the backend, to swap the information of the dentist with the provided input.
     * @param event event object.
     */
    const submit = (event) => {

        if (!/\S+@\S+\.\S+/.test(email) && email) {
            const email = document.getElementById("email");
            email.setCustomValidity("Invalid email format")
        } else {
            event.preventDefault();
            if (!(name || phoneNumber || email)) {
                const message = {
                    text: "Can not change empty fields!"
                }
                alert(message)
            } else {
                if (client !== null) {
                    client.publish('editDentistInfo', JSON.stringify(
                        {
                            id: client.options.clientId,
                            body: {
                                id: id,
                                name: currentName,
                                phone: phone,
                                email: currentEmail,
                            },
                        }
                    ))
                }
            }
        }
    }

    if (!open) return null;
    return (
        <div onClick={onClose} id='dentistOverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                id='dentistModalContainer'
            >
                <div id='dentistModalRight'>
                    <div id='dentistContent'>
                        <h1>Edit Dentist</h1>
                        <button type={"button"} className='dentistBtn-close' onClick={onClose}>X</button>
                    </div>
                    <div id='dentistBtnContainer'>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                id={"name"}
                                value={currentName}
                                style={{color: "black"}}
                                onChange={(e) => handleChanges(e)}
                            />
                            <label htmlFor="name"> Dentist's name </label>
                        </div>
                    </div>
                    <div className="form-floating">
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="PhoneNumber"
                            name="phoneNumber"
                            id={"phoneNumber"}
                            value={phone}
                            onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="phoneNumber"> Dentist's phone number </label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            id={"email"}
                            value={currentEmail}
                            onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="email"> Dentist's email </label>
                    </div>
                    <button className={"button"} onClick={(e) => submit(e)}>
                        Change info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
