# Clinic-Data Backend

## Description 
This is a component service that is part of the Dentistry project. Clinic-Data service contains and handles 
all clinic-related backend logic. Namely, creating, updating and getting clinics. 

It is built upon a custom, HiveMQ based, MQTT backend implementation which acts as a middle-man 
between the client and backend. Furthermore, it receives messages from different clients, handles those messages and sends a response. 
These responses depend on the success of the respective called operation and are in JSON-format, either including a success message or the opposite. 


### MongoDB
This component uses the schemas that are stored within a external [helpers folder](https://github.com/ErgimanGU/Dentistry/tree/main/server/helpers).
Specifically, the "dentist" and the "clinic" schemas as it creates and updates models of those. 
