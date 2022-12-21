import {useState} from "react";

//this class contains all timeslots as an array list for each day of the week


const YourClinicTimeslots = () => {

     const [yourClinicMonday, setYourClinicMonday] = useState([
        {time: "09:00", batch: 3},
        {time: "09:30", batch: 3},
        {time: "10:00", batch: 3},
        {time: "10:30", batch: 3},
        {time: "11:00", batch: 3},
        {time: "11:30", batch: 3},
        {time: "12:00", batch: 3},
        {time: "12:30", batch: 3},
        {time: "13:00", batch: 3},
        {time: "13:30", batch: 3},
        {time: "14:00", batch: 3},
        {time: "14:30", batch: 3},
        {time: "15:00", batch: 3},
        {time: "15:30", batch: 3},
        {time: "16:00", batch: 3},
        {time: "16:30", batch: 3}
    ]);

     const [yourClinicTuesday, setYourClinicTuesday] = useState([
        {time: "08:00", batch: 3},
        {time: "08:30", batch: 3},
        {time: "09:00", batch: 3},
        {time: "09:30", batch: 3},
        {time: "10:00", batch: 3},
        {time: "10:30", batch: 3},
        {time: "11:00", batch: 3},
        {time: "11:30", batch: 3},
        {time: "12:00", batch: 3},
        {time: "12:30", batch: 3},
        {time: "13:00", batch: 3},
        {time: "13:30", batch: 3},
        {time: "14:00", batch: 3},
        {time: "14:30", batch: 3},
        {time: "15:00", batch: 3},
        {time: "15:30", batch: 3},
        {time: "16:00", batch: 3},
        {time: "16:30", batch: 3}
    ]);

     const [yourClinicWednesday, setYourClinicWednesday] = useState([
        {time: "07:00", batch: 3},
        {time: "07:30", batch: 3},
        {time: "08:00", batch: 3},
        {time: "08:30", batch: 3},
        {time: "09:00", batch: 3},
        {time: "09:30", batch: 3},
        {time: "10:00", batch: 3},
        {time: "10:30", batch: 3},
        {time: "11:00", batch: 3},
        {time: "11:30", batch: 3},
        {time: "12:00", batch: 3},
        {time: "12:30", batch: 3},
        {time: "13:00", batch: 3},
        {time: "13:30", batch: 3},
        {time: "14:00", batch: 3},
        {time: "14:30", batch: 3},
        {time: "15:00", batch: 3},
        {time: "15:30", batch: 3},
    ]);
     const [yourClinicThursday, setYourClinicThursday] = useState([
        {time: "09:00", batch: 3},
        {time: "09:30", batch: 3},
        {time: "10:00", batch: 3},
        {time: "10:30", batch: 3},
        {time: "11:00", batch: 3},
        {time: "11:30", batch: 3},
        {time: "12:00", batch: 3},
        {time: "12:30", batch: 3},
        {time: "13:00", batch: 3},
        {time: "13:30", batch: 3},
        {time: "14:00", batch: 3},
        {time: "14:30", batch: 3},
        {time: "15:00", batch: 3},
        {time: "15:30", batch: 3},
        {time: "16:00", batch: 3},
        {time: "16:30", batch: 3},
    ]);

     const [yourClinicFriday, setYourClinicFriday] = useState([
        {time: "09:00", batch: 3},
        {time: "09:30", batch: 3},
        {time: "10:00", batch: 3},
        {time: "10:30", batch: 3},
        {time: "11:00", batch: 3},
        {time: "11:30", batch: 3},
        {time: "12:00", batch: 3},
        {time: "12:30", batch: 3},
        {time: "13:00", batch: 3},
        {time: "13:30", batch: 3},
        {time: "14:00", batch: 3},
        {time: "14:30", batch: 3},
    ]);
}

export default YourClinicTimeslots;


