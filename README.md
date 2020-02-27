# Star Wars Character Information Lookup

 This is an application for looking up and displaying consolidated information for various characters in the Star Wars universe. The information is collected from the [Star Wars API](https://swapi.co/)(Swapi). The documentation for the Swapi is available [here](https://swapi.co/documentation).
 
 #### The application consists of the following components:
 
 - **Frontend UI:** A frontend UI built with Angular 8 to enable the users to query for and view the information on a character from the Star Wars Universe
 - **Backend:** A backend built with NodeJS/Express that provides the API endpoints which the frontend UI communicates with and which fetch the data from the *Swapi*.

### Downloading and running application locally

To run the application locally, download or clone the repo. Following dependencies are needed prior to running the application:
- Docker
- Docker-compose
 
To start the application, from within the root directory of the project run the command ``` docker-compose up -d ``` in the terminal. This will initiate building of the docker images for the front and backend components and then start them in their respective containers. The UI will be available on browser at ```http://localhost:3100``` whereas the API listens on port ```8100```. 

Prior to starting this application, ensure both these ports are not in use. Successful API startup can be determined by sending request to ```http://localhost:8100/health```which should return an *ok* response.

#### Using the frontend

On the UI, the user is presented with two ways to query and view the information relavant to the character in the Star Wars Universe. They can select a person name from the dropdown which will subsequently query for and display the information related to that character. Secondly, if the user already knows the id for the person, they can input the id in the search field and view the results.


#### Notes for backend API

Any changes to the API port should be updated in the ```environment``` and ```port``` settings in the ```docker-compose.yml``` files located in the parent and the ```star-wars-api``` folder and the ```docker-compose-test.yml``` file located in the api's folder.

- To run tests for API, navigate to the ```star-wars-api``` folder and run the below command in the terminal:
  ```bash
  docker-compose -f docker-compose-test.yml run --rm api-test 
  ```

#### Notes for frontend

The angular application currently is served on port 3100. To update the port, change the port setting in the relevant places in the *docker-compose* file for *star-wars-ui* service as well as *serve* options in the ``` angular.json``` file. Similarly, if API endpoint has been changed, update the baseURL value in environment file.

The *Swapi* is sometimes slow in returning results and therefore, some searches from the frontend app can take some time to return the relevant information back. At the initial page load, the UI queries the backend for list of characters to populate the dropdown. The backend response can be delayed until the results are returned from *Swapi*.
