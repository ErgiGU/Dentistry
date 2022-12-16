import React, {useEffect, useState} from 'react';
import './NewDentist.css';
import mqttHandler from "../common_components/MqttHandler";

export function NewDentist() {
    const [client, setClient] = useState(null);
    const [formData, setFormData] = useState({
        dentistName: '',
        phoneNumber: '',
        email: '',
        specialty: ''
    })

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
                    case client.options.clientId + '/AddDentistResponse':
                        receivedMessage(message.toString())
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

    function receivedMessage(message) {
        console.log(message)
        const pMessage = JSON.parse(message)
        console.log(pMessage.status)
        alert(pMessage)
    }

    const handleChanges = (e) => {
        e.persist();
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
        console.log(formData);
    }

    const submit = (e) => {
        if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email) {
            const email = document.getElementById("email")
            email.setCustomValidity("Invalid email format")
        }
        if (!/^[0-9]*$/.test(formData.phoneNumber)) {
            const phone = document.getElementById("phoneNumber")
            phone.setCustomValidity("Phone number must contain digits only!")
        }
        else if ((formData.dentistName && formData.email && formData.phoneNumber && formData.specialty)) {
            e.preventDefault();
            if (client !== null) {
                client.publish('AddDentist', JSON.stringify(
                    {
                        id: client.options.clientId,
                        body: {
                            email: "modify@hotmail.se",
                            name: formData.dentistName,
                            dentistEmail: formData.dentistName,
                            phoneNumber: formData.phoneNumber,
                            speciality: formData.specialty
                        }
                    }
                ))
            }
        }

    }

    return (
        <div className="container">
            <div id="liveAlertPlaceholder"></div>
            <form className="formBox">
                <h2> Add a new dentist </h2>
                <div className="form-floating">
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
                <div className="form-floating">
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
                <div className="form-floating">
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
                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                            name="specialty" onChange={(e) => handleChanges(e)} required>
                        <option value="Endodontist">Endodontist</option>
                        <option value="Orthodontist">Orthodontist</option>
                        <option value="Periodontist">Periodontist</option>
                        <option value="Prosthodontist">Prosthodontist</option>
                        <option value="Pedodontist">Pedodontist</option>
                    </select>
                    <label htmlFor="floatingSelect"> Speciality </label>
                </div>
                <button className={"button"} onClick={(e) => submit(e)}>
                    Add Dentist!
                </button>
            </form>
        </div>
    )
}