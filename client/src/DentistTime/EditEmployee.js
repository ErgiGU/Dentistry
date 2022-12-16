import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

//in case needed bootstrap template

//<BootstrapSwitchButton
//checked={false}
//onlabel='Admin User'
//offlabel='Regular User'
//onChange={(checked: boolean) => {
//  this.setState({ isUserAdmin: checked })
//}}
///>

//remove overlay and figure out how to gray out much code

const Modal = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'
            >
                <div className='modalRight'>

                    <div className='content'>
                        <h1>Working days</h1>
                        <button type={"button"} className='btn-close btnOutline' onClick={onClose}></button>
                    </div>
                    <div className='btnContainer'>
                        <h4>monday</h4>
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel='on duty'
                            offlabel='off duty'
                            width={100}  />
                        <div className={'form-check form-switch'}>
                            <input className={'form-check-input'} type={'checkbox'} role={'switch'}/>
                        </div>
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
                <div className="noteAndConfirm">
                <h5>
                    NOTE: this is a running calender,
                    it will display the same hours from week to week if no changes are made.
                    If your schedule changes please update this calender.
                </h5>
                    <button className='confirmBtn' onClick={onClose}>
                        confirm changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
