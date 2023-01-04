import React, {useEffect, useState} from 'react';
import './NewDentist.css';
import mqttHandler from "../common_components/MqttHandler";
import PrivateNavbar from "../common_components/PrivateNavbar";
import jwt from "jsonwebtoken";
import {useNavigate} from "react-router-dom";

export function NewDentist() {
    const [client, setClient] = useState(null);
    const [currentClinic, setCurrentClinic] = useState({
        email: ''
    });
    const [formData, setFormData] = useState({
        dentistName: '',
        phoneNumber: '',
        email: '',
        specialty: ''
    });
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
    }, []);

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

            client.on('message', function (topic, message) {
                switch (topic) {
                    case client.options.clientId + '/addDentistResponse':
                        receivedMessage(message.toString())
                        break;
                    case client.options.clientId + '/currentLoggedInClinicResponse':
                        console.log(JSON.parse(message))
                        const pmessage = JSON.parse(message)
                        setCurrentClinic(formData => ({
                            ...currentClinic,
                            email: pmessage.email,
                        }))
                        break;
                    default:
                        break;
                }
            })
        }

        /**
         * Recieves the response from backend, parses it and sends it over to be alerted.
         * @param message the response from backend.
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
    }, [client])

    /**
     * Visually displays a response message to the user.
     * @param message the response.
     */
    const alert = (message) => {
        const alertPlaceholder = document.getElementById('dentistAlertPlaceholder')
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
     * Chanegs the states of the variables whenever the user types in something, using the event.
     * @param e event object
     */
    const handleChanges = (e) => {
        e.persist();
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    /**
     * Validates that the email and phone number are in the correct format
     * Then sends the data over to the backend to create the dentist.
     * @param e event object.
     */
    const submit = (e) => {
        if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email) {
            const email = document.getElementById("email")
            email.setCustomValidity("Invalid email format")
        }
        if (!/^[0-9]*$/.test(formData.phoneNumber)) {
            const phone = document.getElementById("phoneNumber")
            phone.setCustomValidity("Phone number must contain digits only!")
        } else {
            e.preventDefault();
            console.log(formData)
            if (client !== null) {
                client.publish('AddDentist', JSON.stringify(
                    {
                        id: client.options.clientId,
                        body: {
                            email: currentClinic.email,
                            name: formData.dentistName,
                            dentistEmail: formData.email,
                            phoneNumber: formData.phoneNumber,
                            speciality: formData.specialty
                        }
                    }
                ))
            }
        }

    }

    return (
        <>
            <PrivateNavbar/>
            <div className="newDentistContainer">
                <div id="dentistAlertPlaceholder"></div>
                <form className="dentistFormBox">
                    <h2> Add a new dentist </h2>
                    <div className="form-floating dentistInputContainer">
                        <input required
                               type="text"
                               className="form-control"
                               placeholder="dentistName"
                               name="dentistName"
                               id={"dentistName"}
                               value={formData.dentistName}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="name"> Dentist's name </label>
                    </div>
                    <div className="form-floating dentistInputContainer">
                        <input required
                               type="text"
                               className="form-control"
                               placeholder="email"
                               name="email"
                               id={"email"}
                               value={formData.email}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="email"> Dentist's email </label>
                    </div>
                    <div className="form-floating dentistInputContainer">
                        <input required
                               type="tel"
                               className="form-control"
                               placeholder="phone number"
                               name="phoneNumber"
                               id={"phoneNumber"}
                               value={formData.phoneNumber}
                               onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="phoneNumber"> Dentist's phone number </label>
                    </div>
                    <div className="form-floating dentistInputContainer">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                                name="specialty" onChange={(e) => handleChanges(e)} required>
                            <option selected>Open this select menu</option>
                            <option value="Endodontist">Endodontist</option>
                            <option value="Orthodontist">Orthodontist</option>
                            <option value="Periodontist">Periodontist</option>
                            <option value="Prosthodontist">Prosthodontist</option>
                            <option value="Pedodontist">Pedodontist</option>
                        </select>
                        <label htmlFor="floatingSelect"> Speciality </label>
                    </div>
                    <button className={"dentistButton"} onClick={(e) => submit(e)}>
                        Add Dentist!
                    </button>
                </form>
            </div>
        </>
    )
}