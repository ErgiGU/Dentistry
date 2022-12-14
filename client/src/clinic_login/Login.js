import React, {useEffect, useState} from 'react';
import "./Login.css";
import mqttHandler from "../common_components/MqttHandler";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [client, setClient] = useState(null);

    // Primary client generating effect
    useEffect(() => {
        if (client === null) {
            setClient(mqttHandler.getClient(client))
        }
    }, [client])

 /*   setTimeout(() => {
        navigate("/");
    }, 3000);
*/
    // Secondary effect containing all message logic and closure state
    useEffect(() => {
        if (client !== null) {
            client.subscribe(client.options.clientId + '/#');
            client.on('message', function (topic, message) {
                // eslint-disable-next-line no-unused-vars
                const intermediary = message.toString();
                switch (topic) {
                    case client.options.clientId + "/login":

                        break;
                    default:
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
    }, [client])


    // eslint-disable-next-line no-unused-vars
    function sendMessage(topic,json) {
        if (client !== null) {
            client.publish(topic, JSON.stringify(json));
        }
    }

    // eslint-disable-next-line no-unused-vars
    function login(){

    }

    return(
        <>
            <div className='loginBody'>
                <div className="row" id="rowContainer2">
                    <div className="col-md-4" id="parentContainer2">
                        <form id="loginForm"  >
                            <h2 className="text-center mb-2 text-white" style={{lineHeight: '2'}}>Sign In</h2>
                            <div className="alert alert-danger" style={{lineHeight: '10px'}}>
                                Invalid password/email
                            </div>

                            <div className="form-floating mb-4">
                                <input type="email" className="form-control form-control-lg" id="email" placeholder="aa@mail.com"
                                       required/>
                                    <label>Email</label>
                            </div>

                            <div className="form-floating mb-4">
                                <input type="password" className="form-control form-control-lg" id="pass" placeholder="b" required/>
                                    <label>Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary align-self-center"  style={{width: '150px', height: '50px'}} >Sign
                            In
                        </button>
                        <p className="text-center mt-2 mb-2 text-white">Don't have an account?
                            <Link to="/registration" style={{color: 'black'}}>Register here </Link>
                        </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}