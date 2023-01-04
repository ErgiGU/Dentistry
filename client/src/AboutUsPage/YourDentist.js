import React from 'react';
import "./AboutUs.css";

export function YourDentist() {
    return (
        <>
            <div id="main">
                <div id="info">
                    <p id="intro-text">
                        <br/><span style={{color: "#003d80"}}>YOUR DENTIST </span> <br/> <br/>
                        We are located at <i> Spannmålsgatan 20, Gothenburg. </i> <br/>
                        Our highly specialised dentists aim to help you fix your teeth problems in the simplest way
                        possible. <br/>
                        Following are our opening hours for the respective days, feel free to book your desired
                        timeslot by going to the Appointments section.
                        <div id="table">
                            <table id="opening-hours">
                                <tr>
                                    <th> Days</th>
                                    <th> Opening hours</th>
                                </tr>
                                <tr>
                                    <td> Mondays</td>
                                    <td> 09.00 - 17.00</td>
                                </tr>
                                <tr>
                                    <td> Tuesdays</td>
                                    <td> 08.00 - 17.00</td>
                                </tr>
                                <tr>
                                    <td> Wednesdays</td>
                                    <td> 07.00 - 16.00</td>
                                </tr>
                                <tr>
                                    <td> Thursdays</td>
                                    <td> 09.00 - 17.00</td>
                                </tr>
                                <tr>
                                    <td> Fridays</td>
                                    <td> 09.00 - 15.00</td>
                                </tr>
                            </table>
                            <br/>
                            <span> We are closed on weekends and please contact our clinic for more information about
                               the opening hours on public holidays.  </span>
                        </div>

                    </p>

                </div>
                <br/>

            </div>

        </>
    )
}
