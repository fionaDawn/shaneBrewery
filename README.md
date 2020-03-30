What are the highlights of your logic/code writing style?

MVC architecture.

For the react app's file structure, all actions, services and reducers is placed in an entity's folder. It would be easier to debug related files under a single folder rather than navigating to a lot of folders during debugging, especially on huge scale apps.

Ideally, the containers should be linked to a service such that whenever the temperature changes, it would call the breweryApi's udpate container. I designed it in a way that every single temperature change is reflected to the frontend so that while Shane is driving and gets a glimpse of the app and notice that some containers are about to go out of range, he can adjust them beforehand.

I did not put an update temperature button for every container, might not be realistic. Since Shane cannot manually increase the temperature, he can just turn the knob or push the button but we'd still rely on the container's service to call our endpoint when the temperature changes. However, I did put in remove container, so that when a container has been delivered in one of the stops, Shane can mark it as done.

I used Service-Sent Events for the frontend app to be able to receive data changes from the backend.

What could you do better in your next iteration?
For the backend, boost test coverage, add more cases and integrate it to an actual DB. Right now it's only retrieving beer data from a json file. Add validation for max number of containers. Right now it an accomodate as much as whatever the user inputs.

For the frontend, styling and more interactive components. Validation for text inputs. Web push notification - I initially worked on this for notifications so even when Shane would go off screen, he'll still get notified. So maybe integrate the prototype that I currently have.

WHat were the questions you asked and your own answers/assumptions.

1. How many containers could fit in one delivery?
   There is not limit - containers could be of different sizes.
2. How does the backend server know when the temperature of the containers change?
   I assume it's connected to a service wherein everytime the temperature is changed, it calls our backend endpoint.
3. Can the containers' temperature drop or rise at the same time?
   Yes. But my mock thermometer will only update 1 container at a certain interval.
4. How will the backend know which container to update?
   For now, (since it's not in an actual db yet) the mock thermometer would send random numbers from 1 to 15. In the backend, IDs are incremental starting from 1.
5. What will be the containers' temperature when the delivery is started?
   Assume that all containers are in the mean temperature - if low is 4 and high is 6, mean is 5
6. Since a single delivery may have many stops, how does the app handle this?
   Every container has a 'mark as delivered' button so Shane get remove it from the list of containers to keep track of
7. Can the app keep track of multiple deliveries?
   Nope, it's just for Shane.
8. How do we know te containers' configuration every delivery?
   Shane can enter the number of containers per beer type
