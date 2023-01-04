# Helpers and Schemas

## Description 
The helpers directory acts as a medium to help interact to different servies. It contains a file to establish a mongoose client connection and a mongoose model on a connection instance. It also contains MQTT client creation class to connect to the MQTT broker and also send messages and subscribe to topics via the MQTT connection.
There is also a schema directory which create mongoose schemas for clinic, dentist, patient and timeslots. 

## Installation
User needs to have a mongoose server and a hiveMQ server installed on the local machine.

## Diagram
The Entity- Relation diagram
![ER Diagram](.server/helpers/ER_diagram.png)

