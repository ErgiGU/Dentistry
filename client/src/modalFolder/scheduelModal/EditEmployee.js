import React, {useEffect} from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import "./EditEmployee.css"

//in case needed bootstrap template

//<BootstrapSwitchButton
//checked={false}
//onlabel='Admin User'
//offlabel='Regular User'
//onChange={(checked: boolean) => {
//  this.setState({ isUserAdmin: checked })
//}}
///>


const Modal = ({ open, onClose, dentist }) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className='scheduleOverlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='scheduleModalContainer'
            >
                <div className='scheduleModalRight'>

                    <div className='scheduleContent'>
                        <h1>Working days</h1>
                        <button type={"button"} className='scheduleBtn-close btnOutline' onClick={onClose}></button>
                    </div>
                    <div className='scheduleBtnContainer'>
                        <h4>monday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                        <h4>tuesday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                        <h4>wednesday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                        <h4>thursday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                        <h4>friday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                        <h4>saturday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100} />
                        <h4>sunday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                    </div>
                </div>
                <div className="scheduleNoteAndConfirm">
                <h5>
                    NOTE: this is a running calender,
                    it will display the same hours from week to week if no changes are made.
                    If your schedule changes please update this calender.
                </h5>
                    <button className='scheduleConfirmBtn' onClick={onClose}>
                        confirm changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
