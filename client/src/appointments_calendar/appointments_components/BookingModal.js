import React, {useState} from 'react'
import ReactDom from "react-dom";
import './Modal.css'
import {formatISO} from "date-fns";

export default function BookingModal({modalShow, onClose, slot, clinic, client}) {
    const [formData, setFormData] = useState({
        patientName: '',
        patientEmail: '',
        patientDateOfBirth: '',
        patientText: ''
    });
    const patientName = document.getElementById('clinicName');
    const patientEmail = document.getElementById('address');
    const patientDateOfBirth = document.getElementById('email');
    const patientText = document.getElementById('password');
    const alertPlaceholder = document.getElementById("displayAlert");

    //This is for the checkbox
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
        const okButton = document.getElementById("bookingButton");
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
            [event.target.id]: event.target.value
        }));
    };

    /**
     * Sends booking information to backend and closes modal.
     * Confirmation handled by Appointments.js
     */
    function handleBooking() {
        let message = {
            clientId: client.options.clientId,
            body: {
                // clinicID: clinic._id,
                clinicID: '63b70ba9108d58f87599131e',
                patientInfo: {
                    // name: patientName,
                    // email: patientEmail,
                    // dateOfBirth: patientDateOfBirth,
                    // text: patientText
                    name: 'John',
                    email: 'john@doe.com',
                    dateOfBirth: '1978-02-09',
                    text: 'teef hurt'
                },
                dentistID: '63b70bb69bc4afd6a0969c86',
                //dentistID: slot.dentists[0],
                date: formatISO(Date.now(), {representation: "date"}),
                time: slot.time
            }
        }
        client.publish(client.options.clientId + '/triggerLoading', JSON.stringify({booking:'booking'}))
        client.publish('bookAppointment', JSON.stringify(message))
        onClose()
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
                                    <h2 className="text-center text-white mb-3" style={{top: '100px'}}>Patient
                                        information</h2>
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
                                        <label>Name</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type={"email"}
                                               className={"form-control form-control-lg"}
                                               id={"patientEmail"}
                                               value={formData.patientEmail}
                                               name={"patientForm"}
                                               placeholder={"a"}
                                               onChange={handleInputChange}
                                               required/>
                                        <label>Email</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type="date"
                                               className="form-control form-control-lg"
                                               id="patientDateOfBirth"
                                               name="patientForm"
                                               value={formData.patientDateOfBirth}
                                               onChange={handleInputChange}
                                               required/>
                                        <label>Date of Birth</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               id="patientText"
                                               name="patientForm"
                                               value={formData.patientText}
                                               title="Describe your symptoms"
                                               placeholder=""
                                               onChange={handleInputChange}
                                               required/>
                                        <label>Symptoms</label>
                                    </div>

                                    <div className="form-check d-flex mb-2">
                                        <input className="form-check-input me-2"
                                               type="checkbox" checked={checked}
                                               onChange={handleChange} id="bookingTosCheckbox"/>
                                        <label className="form-check-label">I accept the Terms
                                            of Service and acknowledge the use of my data for this
                                            booking</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={'modal-footer'}>
                            <div className={'btn btn-primary text-white sign-up disabled'} id={'bookingButton'}
                                 onClick={handleBooking}>
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