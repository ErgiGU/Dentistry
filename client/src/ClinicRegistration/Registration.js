import React from 'react';
import './Registration.css';
import {useState} from "react";

export function Registration(){
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
    function checkIfPassMatches() {
        const pass = document.getElementById('pass');
        const confPass = document.getElementById('confPass');
        if (pass.value !== confPass.value) {
            confPass.setCustomValidity("Passwords don't match");
        } else {
            confPass.setCustomValidity('');
        }
    }

    return (
       <>
           <div className="registrationBody">
               <div className="row needs-validation justify-content-center" id="rowContainer1">
                   <div className="col-md-4" id="parentContainer1" >
                       <form id="registrationForm" className='flex flex-column'>
                           <h2 className="text-center text-white mb-3" style={{top: '100px'}} >Register your clinic</h2>
                           <div className="alert alert-success" style={{lineHeight: '10px'}}>
                               Registration Successful!
                           </div>

                           <div className="form-floating mb-4">
                               <input type="text" className="form-control form-control-lg" id="fName" placeholder="a"
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

                           <button className="btn btn-primary text-white sign-up disabled" id="btn1"
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


