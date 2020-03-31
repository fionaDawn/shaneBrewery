# Pragmabrewery


#### Pre-requisites:
- node
- yarn
- docker
- docker-compose

### How to run locally?
1. Clone this repo and run `bash run.sh` in the root folder.
2. Wait until it's done - it should log listening on ports 5000 and 3000.
3. After that you’ll be able to enter a frontend in a browser with a link: http://localhost:8080

### How to test?
Run `bash test.sh` in the root folder

### What are the highlights of your logic/code writing style?

Ideally, the containers should be linked to a service such that whenever the temperature changes, it would call the backend Api's udpate container. I designed it in a way that every single temperature change is reflected to the frontend so that while Shane is driving and gets a glimpse of the app and notice that some containers are about to go out of range, he can adjust them beforehand.

I did not put an update temperature button for every container, might not be too realistic. Shane cannot manually increase the actual temperature data, he can just turn the knob or push the button but we'd still rely on the container's service to call the API endpoint when the temperature changes. However, I did put in remove container, so that when a container has been delivered in one of the stops, Shane can mark it as done.

Over all, the project is built with a mix of MVC and Microservice architecture. I added a mock sensor service since I didn't want to add this in the backend if it's for temporary.

#### breweryApi (backend)
This project is in Node with Express. I used Service-Sent Events as the main communication from the backend to the frontend. There's no database integrated with it yet, for now it just loads data from the json file. 

File structure is also patterned to MVC style. Models are separate from the controllers, and so on. Jest is used for testing and nock for mocking http requests.


#### pragmabrewery (frontend)
Frontend is in React and Redux, with babel as javscript compiler and webpack to bundle javascript files. The UI components are in Material Ui framework. I decided to use the framework for easier and faster development on the UI components. Jest is used for running test and Enzyme for React components.

EventSource is used to listen to the messages sent from the backend through Service-Sent Events.

For the file structure, all actions, services and reducers are placed in an entity's folder. It would be easier to debug related files under a single folder rather than navigating to a lot of folders, especially on large scale apps.

#### thermometersensor (mock container service)
 Node and Express JS mock service for the containers to be able to call the api endpoint to update the temperature at a certain interval.
 
 Currently this is also the service that stops the whole delivery by a single click since this is the service that holds the timer to keep on updating container temperature.
 

### What could you do better in your next iteration?
For the backend, boost test coverage, add more cases and integrate it to an actual DB. Right now it's only retrieving beer data from a json file. Add validation for max number of containers. Right now it can accomodate as much as whatever the user inputs.

For the frontend, styling and more interactive components. Validation for text inputs. Add web push notification so even when Shane would go off screen, he'll still get notified.

### What were the questions you asked and your own answers/assumptions.

1. How many containers could fit in one delivery?
   There is no limit - containers could be of different sizes.
   
2. How does the backend server know when the temperature of the containers change?
   I assume it's connected to a service wherein everytime the temperature is changed, it calls our backend endpoint.
   
3. Can the containers' temperature drop or rise at the same time?
   Yes. But my mock thermometer will only update 1 container at a certain interval.
   
4. How will the backend know which container to update?
   For now, (since it's not in an actual db yet) the mock thermometer would send random numbers from 1 to 15. In the backend, IDs are incremental starting from 1.
   
5. What will be the containers' temperature when the delivery is started?
   Assume that all containers are in the mean temperature - if low is 4 and high is 6, mean is 5
   
6. Since a single delivery may have many stops, how does the app handle this?
   Every container has a 'mark as delivered' button so Shane can just click remove it from the list of containers to keep track of
   
7. Can the app keep track of multiple deliveries?
   Nope, it's just for Shane.
   
8. How do we know the containers' configuration for every delivery?
   Shane can enter the number of containers per beer type.
   
### Any other notes you feel relevant for the evaluation of your solution?
I learned a lot of new stuff while doing the code assessment. This is my first time creating React app from scratch without the use of create-react-app boilerplate. So I just learned what the loaders are for and resolving extensions to include jsx files. In testing, spent a lot of time figuring out how to test the Redux actions and how to simulate clicks in React components - since simulate was already deprecated.

Also learned about web push notifications. I was able to make a prototype of it since this was the path I was gonna take but  it just runs in the background and doesn't reflect in the UI until you click the actual notification.

The highlight of the highlights is being able to successfully run docker for all apps. Initially the setup was the backend and the thermometersensor will be inside the ui app and just run yarn from there. But today I did a last minute docker research and finally was able to successfully build it and figure out how to link the apps together.
