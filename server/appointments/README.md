# Appointments Service

## Description 
This is a component service that is a part of Dentistry project.

Appointments service handles and contains all backend logic pertaining to booking and canceling appointments.

It is built upon a custom, HiveMQ based, MQTT backend implementation which handles inputs from various clients and sends a response message. It does so after either completing or failing operations that pretain to appointments. These operations are mongoose database manipulations. It also emailing logic. During booking and canceling of appointments emails are sent out to relevant patients/clinics using NodeMailer. 



## Installation
Here you should mention what installation is required to run this directory. Include MQTT connection and npm install step wise.

Firstly, the repository must be cloned/installed. The link to the other components that this service is assosiated with can be found [here](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/blob/main/README.md). For the HiveMQ to work, a network and a account has to be [set up](https://www.hivemq.com/docs/hivemq/4.10/user-guide/getting-started.html#get-started). The account information must be placed in a config file called "config-server" within the helpers folder.  The MQTT broker must also be install in the device. The communication network host HiveMQ broker is required. To install please follow [these steps](https://www.hivemq.com/docs/hivemq/4.10/user-guide/install-hivemq.html). After that the batch file within the bin folder of the downloaded HiveMQ must be ran as administrator. That opens and runs the local broker. A connection to a MongoDB database is also required. That is also done by putting relevant MongoDB connection information in the "config-server" config file within the helpers folder. Then this service must be ran by running the npm command start "npm start". That will run the component and it will be all ready and waiting for incoming messages! 



## Interaction
Maybe the title can be changed but mention how this directory interacts with the broker, client and the database.

### MQTT

The service uses MQTT to communicate with the front-end client service. It contains a MQTT listener which contains the various MQTT topic endpoints. Depending on the topic of the recieved message a certain logic will be excecuted and result sent back as message to the client.

The following are the topic endpoints that is used by the client within this component:

bookTimeslot: Books a certain timeslot by taking in a stringified JSON which contains a client_id object and body object. The body object further contains clinicID, dentistID, patientInfo and timeslotTime.

cancelBookedTimeslot: Deletes a certain timeslot by taking in a stringified JSON which contains a client_id object and body object. The body object further contains timeslotID.

sendAppointmentInformation: Sends a stringified JSON which contains array which includes: id, patient, patient.name, patient.text, dentist, dentist.name, timeslot. 



### Front-end side (React)

### MongoDB 

Using the Schemas that are stored within a external [helpers folder](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/tree/main/server/helpers). The schemas that this component creates and deletes are the timeslot and patient schemas. It does make use of the clinic and dentist schema to extract information. 

## Contributors
Mention who contributed here. TBD can be removed if its repitative or unnecessary.

