import React, {useEffect, useState} from 'react'
import ReactDom from "react-dom";
import './Modal.css'
import {formatISO} from "date-fns";

export default function BookingModal({modalShow, onClose, slot, clinic, client}) {
    const [formData, setFormData] = useState({
        patientName: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const clinicName = document.getElementById('clinicName');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const pass = document.getElementById('password');
    const confPass = document.getElementById('confirmPassword');


    //This is for the checkbox
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
        const okButton = document.getElementById("btn1");
        if (checked) {
            okButton.classList.add("disabled");
        } else {
            okButton.classList.remove("disabled");
        }
    };

    const handleInputChange = (event) => {
        event.persist();

        setFormData(formData => ({
            ...formData,
            [event.target.name]: event.target.value
        }));
    };

    function handleBooking() {
        let message = {
            clientId: client.options.clientId,
            body: {
                clinicID: '63b749fa938c270b734ec8fd',
                patientInfo: {
                    name: 'John',
                    email: 'john@doe.com',
                    dateOfBirth: '1978-02-09',
                    text: 'teef hurt'
                },
                dentistID: '63b80067182f8ac5d5568cdd',
                date: formatISO(Date.now(), {representation:"date"}),
                time: slot.time
            }
        }
        client.publish('bookAppointment', JSON.stringify(message))
    }

    if (!modalShow) {
        return null
    } else {
        return ReactDom.createPortal(
            <div className={'modal modal-backdrop'} id={'bookingModal'}>
                <div className={'modal-dialog modal-dialog-centered'}>
                    <div className={'modal-content'}>
                        <div className={'modal-header'}>
                            <div className={'modal-title'}>Book timeslot</div>
                            <button className={'btn-close'} onClick={onClose}/>
                        </div>
                        <div className={'modal-body'}>
                            Would you like to book the following timeslot?
                            <div id={'timeslotInfo'}>
                                {slot.time}
                            </div>
                            <div id={'patientInformationForm'}>
                                <form id={'patientInfoForm'} className={'flex flex-column'}>
                                    <h2 className="text-center text-white mb-3" style={{top: '100px'}}>Patient information</h2>

                                    <div id='displayAlert'></div>

                                    <div className="form-floating mb-4">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               id="patientName"
                                               name="patientForm"
                                               value={formData.patientName}
                                               onChange={handleInputChange}
                                               placeholder="a"
                                               required/>
                                        <label>Clinic Name</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               id="address"
                                               name="patientForm"
                                               title="Invalid address format"
                                               placeholder="a"
                                               onChange={handleInputChange}
                                               required pattern="^[\p{L}]+(\s+[\p{L}]+)*\s+[\d]+$" />
                                        <label>Address</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type={"email"}
                                               className={"form-control form-control-lg"}
                                               id={"email"}
                                               name={"patientForm"}
                                               placeholder={"a"}
                                               onChange={handleInputChange}
                                               required/>
                                        <label>Email</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type="password"
                                               className="form-control form-control-lg"
                                               id="password"
                                               name="patientForm"
                                               placeholder="b"
                                               onChange={handleInputChange}
                                               required
                                               pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                                        <label>Password</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={'modal-footer'}>
                            <div className={'btn'} onClick={handleBooking}>
                                Book
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById('root')
        )
    }
}