# Appointments Service

## Description 
This is a component service that is a part of Dentistry project. Appointments service handles and contains all backend logic pertaining to booking and canceling appointments.

It is built upon a custom, HiveMQ based, MQTT backend implementation which handles inputs from various clients and sends a response message. It does so after either completing or failing operations that pretain to appointments. These operations are mongoose database manipulations. It also emailing logic. During booking and canceling of appointments emails are sent out to relevant patients/clinics using NodeMailer. 



### MongoDB 

Using the Schemas that are stored within a external [helpers folder](https://github.com/ErgimanGU/Dentistry/tree/main/server/helpers). The schemas that this component creates and deletes are the timeslot and patient schemas. It does make use of the clinic and dentist schema to extract information. 

