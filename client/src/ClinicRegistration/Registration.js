import React, {useEffect, useState} from 'react';
import mqttHandler from "../common_components/MqttHandler";
import {Link, useNavigate} from "react-router-dom";
import './Registration.css';

export default function Registration() {
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [formData, setFormData] = useState({
        clinicName: '',
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
    
    const alertPlaceholder = document.getElementById("displayAlert");

    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#');
            client.on('message', function (topic, message) {
                const intermediary = message.toString();
                switch (topic) {
                    case client.options.clientId + "/checkEmail":
                        if (intermediary === "email already exists"){
                            console.log(intermediary)
                            email.setCustomValidity("Email already exists");
                            email.reportValidity()
                        }else{
                            email.setCustomValidity("");
                        }
                        break;
                    case client.options.clientId + "/register":
                        /*this code is for making the alert appear and redirecting
                        the user to login(if the registration is successful)*/
                        if(intermediary === "registration successful"){
                            alert(" You've successfully registered your clinic!","success");
                            setTimeout(() => {
                                navigate("/login");
                            }, 3000);
                        }else{
                            alert("Registration failed","danger");
                        }
                        break;
                    default:
                        break;
                }
            })
        }

        const alert = (message, type) => {
            const wrapper = document.createElement("div")
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" style="line-height: 10px">`,
                `   <div>${message}</div>`,
                '</div>'
            ].join('')

            alertPlaceholder.append(wrapper)
        }

        return () => {
            if (client !== null) {
                console.log("ending process");
                client.end()
            }
        }
    }, [alertPlaceholder, client, email, navigate])


    function sendMessage(topic,json) {
        if (client !== null) {
            client.publish(topic, JSON.stringify(json));
        }
    }


    //This is for the checkbox
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
        const okButton = document.getElementById("btn1");
        if(checked){
            okButton.classList.add("disabled");
        }else{
            okButton.classList.remove("disabled");
        }
    };


    function registerClinic1(event) {
        //event.preventDefault();
        clinicName.setCustomValidity("");
        address.setCustomValidity("");
        email.setCustomValidity("")
        pass.setCustomValidity("");
        confPass.setCustomValidity("");

        //checks if email exists by sending it to the backend
        const json = {
            "client_id": client.options.clientId,
            "body": {
                "email": formData.email
            }
        }
        sendMessage('checkIfEmailExists', json);

        checkIfPassMatches();
        if (clinicName.checkValidity() && address.checkValidity() && email.checkValidity() && pass.checkValidity() &&
            confPass.checkValidity()) {
            event.preventDefault();
            let clinicAccount = {
                "client_id": client.options.clientId,
                "body": {
                    "clinicName": formData.clinicName,
                    "address": formData.address,
                    "email": formData.email,
                    "password": formData.password
                }
            }
            sendMessage('registration', clinicAccount);
        }
    }

    function checkIfPassMatches() {
        if (formData.password !== formData.confirmPassword) {
            confPass.setCustomValidity("Passwords don't match");
        }
    }

    const handleInputChange = (event) => {
        event.persist();

        setFormData(formData => ({
            ...formData,
            [event.target.name]: event.target.value
        }));
    };

    return (
       <>
           <div className="registrationBody">
               <div className="row needs-validation justify-content-center" id="rowContainer1">
                   <div className="col-md-4" id="parentContainer1" >
                       <form id="registrationForm" className='flex flex-column'  >
                           <h2 className="text-center text-white mb-3" style={{top: '100px'}} >Register your clinic</h2>
                           <div id='displayAlert'></div>

                           <div className="form-floating mb-4">
                               <input type="text"
                                      className="form-control form-control-lg"
                                      id="clinicName"
                                      name="clinicName"
                                      value = {formData.clinicName}
                                      onChange={handleInputChange}
                                      placeholder="a"
                                      required />
                                   <label>Clinic Name</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="text"
                                      className="form-control form-control-lg"
                                      id="address"
                                      name="address"
                                      title="Invalid address format"
                                      placeholder="a"
                                      onChange={handleInputChange}
                                      required pattern="^([a-zA-Z]+\s){0,2}\d+$" />
                               <label>Address</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="email"
                                      className="form-control form-control-lg"
                                      id="email"
                                      name="email"
                                      placeholder="a"
                                      onChange={handleInputChange}
                                      required   />
                                   <label >Email</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="password"
                                      className="form-control form-control-lg"
                                      id="password"
                                      name="password"
                                      title="Password must contain: Minimum 8 characters at least 1 alphabetic character and 1 number"
                                      placeholder="b"
                                      onChange={handleInputChange}
                                      required
                                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                                   <label>Password</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="password"
                                      className="form-control form-control-lg"
                                      id="confirmPassword"
                                      placeholder="b"
                                      name="confirmPassword"
                                      onChange={handleInputChange}
                               />
                                   <label>Confirm Password</label>
                           </div>

                           <div className="form-check d-flex mb-2">
                               <input className="form-check-input me-2"
                                      type="checkbox" checked={checked}
                                      onChange={handleChange} id="tosCheckbox"/>
                               <label className="form-check-label text-white">I accept the <a href="#!"
                               className="text-body "><u>Terms of Service</u></a>
                               </label>
                           </div>

                           <button className="btn btn-primary text-white sign-up disabled"
                                   id="btn1"
                                   onClick={registerClinic1}
                                   style={{width: '150px', height: '50px', alignSelf: "center"}} >Sign Up
                           </button>

                           <p className="text-center mt-1 mb-2 text-white">Already have an account?
                               <Link to="/login" style={{color: 'black'}}>Login here </Link>
                           </p>
                       </form>
                   </div>
               </div>
            </div>
       </>
    )
}