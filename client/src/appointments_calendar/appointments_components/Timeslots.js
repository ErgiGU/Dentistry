import React from "react";
import './Timeslots.css';

export default function Timeslots({slots = [], setCurrentSlot, setModalShow}) {

    return (
        <div>
            <div className={'list-group'} id={'timeslotListGroup'}>
                {slots.map((slot, index) => (
                    // <div key={index}
                    //      className="btn btn-outline-secondary list-group-item d-flex justify-content-between align-items-start"
                    //      onClick={() => {
                    //          setCurrentSlot(slot);
                    //          setModalShow(true)
                    //          console.log(slot)
                    //      }}>
                    //     <div className="ms-2 me-auto">
                    //         {slot.time}
                    //     </div>
                    //     <div className={'badge bg-primary rounded-pill'}>
                    //         {slot.batch}
                    //     </div>
                    // </div>
                    <button key={index}
                            id={'timeslotListGroupItem'}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                            onClick={() => {
                                setCurrentSlot(slot);
                                setModalShow(true)
                                console.log(slot)
                            }}>
                        <div className="ms-2 me-auto">
                            {slot.time}
                        </div>
                        <div className={'badge bg-primary rounded-pill'}>
                            {slot.dentists.length > 0 ? slot.dentists.length : 0}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}