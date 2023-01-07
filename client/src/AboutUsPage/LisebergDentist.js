import React from 'react';
import "./AboutUs.css";

export function LisebergDentist() {
    return (
        <>
            <div id="aboutUs-main">
                <div id="aboutUs-info">
                    <p id="aboutUs-intro-text">
                        <br/><span style={{color: "#003d80"}}>LISEBERG DENTISTS</span> <br/> <br/>
                        We are located near <i> Liseberg, Gothenburg. </i> <br/>
                        Located near the very fammous liseberg amusement park, we offer all dental care facilities
                        to our patients. <br/> Following are our opening hours for the respective days,
                        feel free to book your desired timeslot by going to the Appointments section.
                        <div id="aboutUs-table">
                            <table id="aboutUs-opening-hours">
                                <tr>
                                    <th> Days</th>
                                    <th> Opening hours</th>
                                </tr>
                                <tr>
                                    <td> Mondays</td>
                                    <td> 10.00 - 18.00</td>
                                </tr>
                                <tr>
                                    <td> Tuesdays</td>
                                    <td> 10.00 - 18.00</td>
                                </tr>
                                <tr>
                                    <td> Wednesdays</td>
                                    <td> 10.00 - 18.00</td>
                                </tr>
                                <tr>
                                    <td> Thursdays</td>
                                    <td> 10.00 - 18.00</td>
                                </tr>
                                <tr>
                                    <td> Fridays</td>
                                    <td> 10.00 - 18.00</td>
                                </tr>
                            </table>
                            <br/><br/>
                            <span> We are closed on weekends and please contact our clinic for more information about
                                the opening hours on public holidays. </span>
                        </div>

                    </p>

                </div>
                <br/>

            </div>

        </>
    )
}
