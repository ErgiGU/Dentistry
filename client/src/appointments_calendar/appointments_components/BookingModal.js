import React, {useEffect} from 'react'
import ReactDom from "react-dom";
import './modal.css'

export default function BookingModal({modalShow, onClose, slot, clinic, client}) {

    useEffect(() => {
        console.log(clinic)
        console.log(slot)
    }, [])

    if (!modalShow) {
        return null
    } else {
        return ReactDom.createPortal(
            <div className={'modal modal-backdrop'} id={'bookingModal'}>
                <div className={'modal-dialog modal-dialog-centered'}>
                    <div className={'modal-content'}>
                        <div className={'modal-header'}>
                            <div className={'modal-title'}>Book timeslot</div>
                            <button className={'btn-close'} onClick={onClose}/>
                        </div>
                        <div className={'modal-body'}>

                        </div>
                        <div className={'modal-footer'}>
                            <div className={'btn'} onClick={onClose}>
                                Close
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById('root')
        )
    }
}