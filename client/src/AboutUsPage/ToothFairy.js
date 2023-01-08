import React from 'react';
import "./AboutUs.css";

export default function ToothFairy() {
    return (
        <div id="aboutUs-main">
            <div id="aboutUs-info">
                <div id="aboutUs-intro-text">
                    <br/><span style={{color: "#003d80"}}>TOOTH FAIRY</span> <br/> <br/>
                    We are located at <i> Slottskogen, Gothenburg. </i> <br/>
                    Our central location makes it perfectly convenient for all the Gothenburg residents
                    to contact us.<br/> Following are our opening hours for the respective days,
                    feel free to book your desired timeslot by going to the Appointments section.
                    <div id="aboutUs-table">
                        <table id="aboutUs-opening-hours">
                            <tbody>
                                <tr>
                                    <th> Days</th>
                                    <th> Opening hours</th>
                                </tr>
                                <tr>
                                    <td> Mondays</td>
                                    <td> 07.00 - 19.00</td>
                                </tr>
                                <tr>
                                    <td> Tuesdays</td>
                                    <td> 07.00 - 19.00</td>
                                </tr>
                                <tr>
                                    <td> Wednesdays</td>
                                    <td> 07.00 - 19.00</td>
                                </tr>
                                <tr>
                                    <td> Thursdays</td>
                                    <td> 07.00 - 19.00</td>
                                </tr>
                                <tr>
                                    <td> Fridays</td>
                                    <td> 07.00 - 19.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/><br/>
                        <span> We are closed on weekends and please contact our clinic for more information about
                            the opening hours on public holidays. </span>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}
