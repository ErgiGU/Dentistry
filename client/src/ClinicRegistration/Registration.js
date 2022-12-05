import React, {useEffect, useState} from 'react';
import mqttHandler from "../common_components/MqttHandler";
import {useNavigate} from "react-router-dom";
import './Registration.css';
import Mqtt from "mqtt";

export function Registration(){
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [response, setResponse] = useState('')


    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#')

            client.on('message', function (topic, message) {
                switch (topic) {
                    case client.options.clientId + '/appointmentResponse':
                        receivedMessage(message)
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

    function receivedMessage(message) {
        // setState or whatever function is needed to visually confirm result of backend call
        console.log(message.toString())
        setResponse(message.toString())
    }

    function sendMessage() {
        if (client !== null) {
            client.publish('appointment', JSON.stringify(
                {
                    id:client.options.clientId,
                    body: {
                        startTime: '2001-01-01'
                    }
                }
            ))
        }
    }

    //This is for connecting to the mqtt broker
    const mqttClient =  Mqtt.connect("ws://localhost:1884/mqtt");
    mqttClient.subscribe('registrationResponse');
    //receives mqtt messages
    mqttClient.on('message', function (topic, message) {
        switch(topic){
            case 'registrationResponse':
                console.log(message.toString());
                break;
        }
    })

    const alertPlaceholder = document.getElementById('displayAlert')

    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" style="line-height: 10px">`,
            `   <div>${message}</div>`,
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    //This is for the checkbox
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
        const okButton = document.getElementById('btn1')
        if(checked){
            okButton.classList.add('disabled')
        }else{
            okButton.classList.remove('disabled')
        }
    };

    //Checks if the 2 password fields match
    function checkIfPassMatches() {
        const pass = document.getElementById('pass');
        const confPass = document.getElementById('confPass');
        if (pass.value !== confPass.value) {
            confPass.setCustomValidity("Passwords don't match");
        } else {
            confPass.setCustomValidity('');
        }
    }
/*    function successAlert(){
        document.getElementById('displayAlert').innerHTML +=
            <div className="alert alert-success" id = "alert" style={{lineHeight: '10px'}}>
                You've successfully registered your clinic! Redirecting to login...
            </div>;
    }*/

    function registerClinic() {

        const clinicName = document.getElementById('clinicName');
        const address = document.getElementById('address');
        const email = document.getElementById('email');
        const pass = document.getElementById('pass');
        const confPass = document.getElementById('confPass');

        if(clinicName.checkValidity() && address.checkValidity() && email.checkValidity() && pass.checkValidity() &&
            confPass.checkValidity()){
            alert(" You've successfully registered your clinic!","success");
            mqttClient.publish("registration","Hellooooo" );
        }

    }

    return (
       <>
           <div className="registrationBody">
               <div className="row needs-validation justify-content-center" id="rowContainer1">
                   <div className="col-md-4" id="parentContainer1" >
                       <form id="registrationForm" className='flex flex-column'>
                           <h2 className="text-center text-white mb-3" style={{top: '100px'}} >Register your clinic</h2>
                           <div id='displayAlert'></div>

                           <div className="form-floating mb-4">
                               <input type="text" className="form-control form-control-lg" id="clinicName" placeholder="a"
                                      required/>
                                   <label>Clinic Name</label>
                           </div>
                           <div className="form-floating mb-4">
                               <input type="text" className="form-control form-control-lg" id="address" placeholder="a"
                                      required/>
                               <label>Address</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="email" className="form-control form-control-lg" id="email"
                                      placeholder="exampleEmail"
                                      required title="Please enter a valid email."/>
                                   <label>Email</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="password" className="form-control form-control-lg" id="pass" title="
                                Password must contain: Minimum 8 characters at least 1 alphabetic character and 1 number"
                                      placeholder="b" required
                                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                                   <label>Password</label>
                           </div>

                           <div className="form-floating mb-4">
                               <input type="password" className="form-control form-control-lg" id="confPass"
                                      placeholder="b" onKeyUp={checkIfPassMatches} required/>
                                   <label>Confirm Password</label>
                           </div>

                           <div className="form-check d-flex mb-2">
                               <input className="form-check-input me-2" type="checkbox" checked={checked}
                                      onChange={handleChange} id="tosCheckbox"/>
                               <label className="form-check-label text-white">I accept the <a href="#!"
                                                                                              className="text-body "><u>Terms
                                   of Service</u></a>
                               </label>
                           </div>

                           <button className="btn btn-primary text-white sign-up disabled" id="btn1" onClick={registerClinic}
                                   style={{width: '150px', height: '50px', alignSelf: "center"}} >Sign Up
                           </button>

                           <p className="text-center mt-1 mb-2 text-white">Already have an account?
                               <router-link to="/" style={{color: 'black'}}>Login here</router-link>
                           </p>
                       </form>
                   </div>
               </div>
            </div>
       </>
    )
}