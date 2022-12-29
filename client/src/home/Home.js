import React from 'react';
import "./Home.css";
import {useState} from 'react'
import EditEmployees from "../DentistTime/EditEmployee"

    //const listItems = dentists.map(dentist => <li>{dentist}</li>);
    //return <ul>{listItems}</ul>;

export default function Home() {

    const [openModal, setOpenModal] = useState(false);
    return(
        <>
            <main>
                <button className="openModal" onClick={() => setOpenModal(true)}>click me</button>
                <EditEmployees open={openModal} onClose={() => setOpenModal(false)} />
            </main>
        </>
    )
}
