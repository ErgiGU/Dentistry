import './MyInformation.css'
import React, {useState} from 'react';

export function MyInformation(){
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    // eslint-disable-next-line
    const [openingHours, setOpeninghours] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    // Changes the initial state of the variables when the user types in something
    const handleChanges = (e) => {
        const {id , value} = e.target;
        if(id === "name"){
            setName(value);
        }
        if(id === "owner"){
            setOwner(value);
        }
        if(id === "address"){
            setAddress(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "oldPassword"){
            setOldPassword(value);
        }
        if(id === "password") {
            setPassword(value)
        }
        if(id === "confirmPassword") {
            setConfirmPassword(value)
        }
    }
    // this will be connected to the backend
    const submit  = () => {
        console.log(name,owner, address, email);
    }

    // This will be connected to the backend, and it will also validate the old password
    const changePassword  = () => {
        console.log(oldPassword,password, confirmPassword);
    }
    return (
        <div className={"container"}>
           <div className="form">
               <h2> My Information </h2>
               <label> Clinic's name </label>
                   <input
                       type="text"
                       name="email"
                       id={"name"}
                       value={name}
                       onChange = {(e) => handleChanges(e)}
                   />
               <label> Clinic's owner   </label>
                   <input
                       type="text"
                       name="owner"
                       id={"owner"}
                       value={owner}
                       onChange = {(e) => handleChanges(e)}
                   />
               <label> Clinic's Address   </label>
                   <input
                       type="text"
                       name="address"
                       id={"address"}
                       value={address}
                       onChange = {(e) => handleChanges(e)}
                   />
               <label> Email address   </label>
                   <input
                       type="text"
                       name="email"
                       id={"email"}
                       value={email}
                       onChange = {(e) => handleChanges(e)}
                   />
               <button className={"button"} onClick={()=>submit()}>
                   Change info
               </button>
           </div>
            <div className="form" id={"form2"}>
                <h2> Change password </h2>
                <label> Old password   </label>
                <input
                    type="password"
                    name="password"
                    id={"oldPassword"}
                    value={oldPassword}
                    onChange = {(e) => handleChanges(e)}
                />
                <label> New password   </label>
                <input
                    type="password"
                    name="password"
                    id={"password"}
                    value={password}
                    onChange = {(e) => handleChanges(e)}
                />
                <label> Confirm password   </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id={"confirmPassword"}
                    value={confirmPassword}
                    onChange = {(e) => handleChanges(e)}
                />
                <button className={"button"} onClick={()=>changePassword()}>
                    Change password
                </button>
            </div>
        </div>
    )
}