## Dashboard & Microservices (Javascript/MySQL/phpMyAdmin)

This project is built and used for testing purpouses, mainly Docker compose and building containered-based microservices. 

**Backend**: Simple API in node.js and express, which connects to a MySql database service that lives in a separate container. 

**Frontend**: Client app using react.js library

**DB administrator/UI**: phpMyAdmin is exposed at port 8081 of our machine in order to visualize/manage MySQL through the browser. 


#Run the system (after previous installation of Docker):

```
docker compose up --build
```

#Stop the system / Stop the system and remove all related containers and images created by docker compose:

```
docker compose down
docker-compose down --rmi all
```
