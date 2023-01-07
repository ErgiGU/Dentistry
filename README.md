# T7 Project
## Dentistry - For people who love to smile. 😀

## Table of Contents
| Title                                                                                                                       | Description |
| ------                                                                                                                      | ------ |
| [Appointments Service](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/tree/main/server/appointments)   | Directory that handles booking appointment from the MQTT side of the application.     |
| [Authorization Service](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/tree/main/server/authorization) | Directory that handles succeful log in and authorization of a Clinic.       |
| [Clinic Data Service](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/tree/main/server/clinic_data)     | Directory that helps interact with Clinic data stored in the database via MQTT broker.     |
| [Helpers and Schemas](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/tree/main/server/helpers)         | A helpers directory which also includes schemas for each entity.       |
| [Front-end side](https://git.chalmers.se/courses/dit355/dit356-2022/t-7/t7-project/-/tree/main/client)                      | The Client side react based application that runs on a local host       |


## Description
This web application is a platform to help you book a dentist appointment in Gothenburg for your desired clinic at your desired time. The application displays the clinic on a map using Google API, so the patients or users can get an exact idea of the clinic's location.
Moreover, the highly interactive calendar displays all the available timeslots for a selected clinic in a weekly format. This system allows the patient to select his suitable time. 
Our application also allows the dental clinic to create a secured account with us. The purpose of the account is to manage the clinic's opening hours, input how many dentists are available and also help the patients to cancel an appointment if needed. Once a patient successfully books an appointment, a confirmation email containing all the necessary details is sent to the provided email address.
<!--Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors. -->


## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Here are the installation steps in order to run the project and import it in your IDE:

### Steps

1. Clone the repository
2. Run "npm install" on all the package files that are in the folders.
3. For the HiveMQ broker to work, a network and an account has to be set up. The account information must be placed in a config file called "config-server" within the helpers folder.
4. The MQTT broker must also be installed in the device. The communication network host HiveMQ broker is required.
5. After that, the batch file within the bin folder of the downloaded HiveMQ must be run as administrator. That opens and runs the local broker.
6. A connection to a MongoDB database is also required. That is also done by putting relevant MongoDB connection information in the "config-server" config file within the helpers folder.
7. After completing the steps above, run these backend components by navigating to their respective folder:
   ```
   clinic_data_app.js
   appointments_app.js
   authorization_app.js
   ```
8. Finally, in order to run the client, navigate to the client directory and do "npm start":
   ```
   cd client
   npm start
   ```
   Those are all the steps, you're all set!



### Links

- HiveMQ getting started page: https://www.hivemq.com/docs/hivemq/4.10/user-guide/getting-started.html#get-started.

- Installation of local HiveMQ broker: https://www.hivemq.com/docs/hivemq/4.10/user-guide/install-hivemq.html.

- Setting up MongoDB database: https://www.mongodb.com/basics/create-database


### Technologies

Here are the technologies that we used in our project:

1. Webstorm IDE
2. React JS frontend framework
3. Node JS backend framework
4. MQTT communication protocol
5. Jmeter with MQTT plugin(for MQTT load testing)
6. MongoDB


## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.


## Authors and acknowledgment

- Agata Ciuchta
- Aieh Eissa
- Burak Askan
- Ergi Senja
- Mathias Hallander
- Ossian Ålund
- Sejal Ulhas Kanaskar

