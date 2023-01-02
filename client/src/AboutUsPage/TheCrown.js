import React from 'react';
import "./AboutUs.css";
export function TheCrown(){
    return (
        <>
            <div id="main">
                <h1 id="heading">About Us</h1>
                <div id="info">
                    <p id="intro-text">
                        <br /><span style={{color: "#003d80"}}>THE CROWN</span>   <br/> <br/>
                        We are located at <i> Lindholmsallén 19, Gothenburg. </i> <br/>
                        We aim the provide the best dental care service for all age groups. <br/>
                        Following are our opening hours for the respective days, feel free to book your desired
                        timeslot by going to the Appointments section.
                        <div id="image" style={{textAlign: "center", float: "right"}}>
                            <img alt="locationOnMap" style={{width: "90%"}} />
                        </div>
                        <div id="table">
                            <table id="opening-hours">
                                <tr><th> Days </th>
                                    <th> Opening hours </th>
                                </tr>
                                <tr>
                                    <td> Mondays</td>
                                    <td> 06.00 - 15.00 </td>
                                </tr>
                                <tr>
                                    <td> Tuesdays</td>
                                    <td> 08.00 - 17.00 </td>
                                </tr>
                                <tr>
                                    <td> Wednesdays</td>
                                    <td> 07.00 - 12.00 </td>
                                </tr>
                                <tr>
                                    <td> Thursdays</td>
                                    <td> 07.00 - 17.00 </td>
                                </tr>
                                <tr>
                                    <td> Fridays </td>
                                    <td> 08.00 - 16.00 </td>
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
