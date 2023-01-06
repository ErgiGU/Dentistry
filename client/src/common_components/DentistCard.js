import React, {useEffect, useState} from 'react';
import "./DentistCard.css"
import EditSchedule from "../modalFolder/scheduelModal/EditEmployee"
import EditDentist from "../modalFolder/dentistModal/DentistModal";

function DentistCard(props) {

    const [openDentistModal, setOpenDentistModal] = useState(false);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);

    return(
        <div className="dentistCardContainer">

            <div className="DentistName">
                    <h3> name </h3>
            </div>
            <div className="DentistPhone">
                <p> phone </p>
            </div>
            <div className="DentistMail">
            <p> mail </p>
            </div>
            <div className="DentistBtn">

                        <button className="openScheduleModal" onClick={() => setOpenScheduleModal(true)}>Edit schedule</button>
                        <EditSchedule open={openScheduleModal} onClose={() => setOpenScheduleModal(false)} />


                        <button className="openDentistModal" onClick={() => setOpenDentistModal(true)}>Edit info</button>
                        <EditDentist open={openDentistModal} onClose={() => setOpenDentistModal(false)} />

            </div>
        </div>
    )
}

export default DentistCard