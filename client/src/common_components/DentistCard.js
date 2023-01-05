import React, {useState} from 'react';
import "./DentistCard.css"
import EditSchedule from "../modalFolder/scheduelModal/EditEmployee"
import EditDentist from "../modalFolder/dentistModal/DentistModal";

function DentistCard(props) {
    const [openModal, setOpenModal] = useState(false)
    return(
        <div className="cardContainer">
            <div className="imageContainer">
                <img src={props.image} alt="pp"/>
            </div>
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

                        <button className="openModal" onClick={() => setOpenModal(true)}>click me</button>
                        <EditSchedule open={openModal} onClose={() => setOpenModal(false)} />


                        <button className="openModal" onClick={() => setOpenModal(true)}>click me</button>
                        <EditDentist open={openModal} onClose={() => setOpenModal(false)} />

            </div>
        </div>
    )
}

export default DentistCard