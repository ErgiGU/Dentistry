import React, {useEffect, useState} from 'react';
import "./DentistModal.css"

//in case needed bootstrap template

//<BootstrapSwitchButton
//checked={false}
//onlabel='Admin User'
//offlabel='Regular User'
//onChange={(checked: boolean) => {
//  this.setState({ isUserAdmin: checked })
//}}
///>


const Modal = ({ open, onClose, props}) => {

    const { name, email, phoneNumber } = props;
    const [client, setClient] = useState(null);
    const [setName] = useState(name);
    const [setPhone] = useState(phoneNumber);
    const [setEmail] = useState(email);

    /**
     * Changes the initial state of the variables when the user changes in something, in order to keep
     * track of the user's input.
     * @param e Event object which contains the user input and field id.
     */
    const handleChanges = (e) => {
        const {id, value} = e.target;
        if (id === "name") {
            setName(value);
        }
        if (id === "phone") {
            setPhone(value);
        }
        if (id === "email") {
            setEmail(value);
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
                    client.publish('editInfo', JSON.stringify(
                        {
                            id: client.options.clientId,
                            body: {
                                name: name,
                                phone: phoneNumber,
                                email: 'modify@hotmail.se',
                                newEmail: email,
                            },
                        }
                    ))
                }
            }
        }
    }

    if (!open) return null;
    return (
        <div onClick={onClose} className='dentistOverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='dentistModalContainer'
            >
                <div className='dentistModalRight'>
                    <div className='dentistContent'>
                        <h1>Edit Dentist</h1>
                        <button type={"button"} className='dentistBtn-close btnOutline' onClick={onClose}></button>
                    </div>
                    <div className='dentistBtnContainer'>
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
                            <label htmlFor="name"> Dentist's name </label>
                        </div>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="PhoneNumber"
                            name="phoneNumber"
                            id={"phoneNumber"}
                            value={phoneNumber}
                            onChange={(e) => handleChanges(e)}
                        />
                        <label htmlFor="phoneNumber"> Dentist's owner </label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            id={"email"}
                            value={email}
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
