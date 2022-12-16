import React from 'react';
import "./Home.css";
import {useState} from 'react'
import EditEmployees from "../DentistTime/EditEmployee"

export function Home(){

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
