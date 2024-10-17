# Authorization Backend

## Description 
This is a component service that is a part of the Dentistry project. Authorization service handles and contains all the backend code for the registration and login page. The methods it contains are responsible for registering the clinic while ensuring that there are no duplicate emails(if the check is successful, it saves it to the DB via mongoose) and logging it in by generating a token.

It is built upon a custom HiveMQ-based MQTT backend implementation which handles the back-and-forth of the client and the backend. It is the middle-man for sending and receiving messages(requests and responses). It is structured so that it sends/receives messages in a json format, whether that's an actual error/success message or an actual json with the clinic information. 



### MongoDB

Using the Schemas that are stored within a external [helpers folder](https://github.com/ErgiGU/Dentistry/tree/main/server/helpers). The schema that this component is using is the "clinic" schema. It ensures that the clinic registered adheres to that structure. 
