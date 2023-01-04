import React from "react";

//this class is a skeleton for viewing timeslots, it will take in the week day as prop

export default function Timeslots({slots = [], setCurrentSlot, setModalShow}) {

    return (
        <div>
            <div className={'list-group'}>
                {slots.map((slot, index) => (
                    <div key={index}
                         className="btn btn-outline-secondary list-group-item d-flex justify-content-between align-items-start"
                         onClick={() => {
                             setCurrentSlot(slot);
                             setModalShow(true)
                             console.log(slot)
                         }}>
                        <div className="ms-2 me-auto">
                            {slot.time}
                        </div>
                        <div className={'badge bg-primary rounded-pill'}>
                            {slot.batch}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}