import React, {useState} from 'react';
import "./DentistCard.css"
import EditSchedule from "../modalFolder/scheduelModal/EditEmployee"
import EditDentist from "../modalFolder/dentistModal/DentistModal";

function DentistCard({id, name, email, phoneNumber, workweek, clinic}) {

    const [openDentistModal, setOpenDentistModal] = useState(false);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
//are email and phone mandatory?
    return(
        <div id="dentistCardContainer">

            <div id="DentistName">
                    <h3> {name} </h3>
            </div>
            <div id="DentistPhone">
                <p> {phoneNumber} </p>
            </div>
            <div id="DentistMail">
            <p> {email} </p>
            </div>
            <div id="DentistBtn">

                        <button id="openScheduleModal" onClick={() => setOpenScheduleModal(true)}>Edit schedule</button>
                        <EditSchedule open={openScheduleModal}
                                      onClose={() => setOpenScheduleModal(false)}
                                      id={id}
                                      name={name}
                                      workweek={workweek}/>


                        <button id="openDentistModal" onClick={() => setOpenDentistModal(true)}>Edit info</button>
                        <EditDentist open={openDentistModal}
                                     onClose={() => setOpenDentistModal(false)}
                                     id={id}
                                     name={name}
                                     email={email}
                                     clinic={clinic}
                                     PhoneNumber={phoneNumber}/>

            </div>
        </div>
    )
}

export default DentistCard