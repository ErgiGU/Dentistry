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


const Modal = ({ open, onClose, dentist }) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

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
        if (id === "phone") {
            setPhone(value);
        }
        if (id === "email") {
            setEmail(value);
        }
    }

    /**
     * Checks if the user's input is valid. E.g the email has a valid format and the opening hours are logical.
     * Then publishes a message to the backend, to swap the information of the clinic with the provided input..
     * @param event event object.
     */
    const submit = (event) => {

        if (!/\S+@\S+\.\S+/.test(email) && email) {
            const email = document.getElementById("email");
            email.setCustomValidity("Invalid email format")
        } else {
            event.preventDefault();
            if (!(name || phone || email)) {
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
                                phone: phone,
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
                            value={phone}
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
