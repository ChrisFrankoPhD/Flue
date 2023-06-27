# React Front, Node Back Application

- the goal of this project is to learn how to make an full deployable application that uses react js on the front end, and node js with express on the back end, and to learn how to integrate these seemlessly
- we also want to be able to use PostgreSQL for the database
- the premise of the app is going to be a social media website with profiles, and friends, and a blog, but that is based around the skyscanner API for sharing flight options, suggesting good prices, tracking certain routes, etc

## Setting Up Our Files

- watchign thsi tutorial for the basic set up for the app: https://www.youtube.com/watch?v=w3vs4a03y3I

### Node Server SetUp

- first as usual we want to create a git repo in the normal way, then make one on github and add it as a remote, wont go over this but this is in my git201 notes
- to start with our react and node set-up, we want to create 2 project folders, one where our react front end will live, and one where the node/express backend will live, we will call these 'client' and 'server' respectively
- we want to then want to navigate to the 'server' directory and initialize npm in the server (node backend) directory with `npm init`, and follow the promts to make a package.json file, and make sure the "main" keyword is set to 'server.js' since we will call the main file of the backend that
- we can then make a server.js file in the client directory, then install express with `npm i express`, and install nodemon with `npm i nodemon -D`, where the `-D` indicates it is a dev decpendency, and not used in the actual production 
    - with nodemon, we have to also add the properties `"start": "node server"` and `"dev": "nodemon server"` to the "scripts" object in the package.json file, this makes `npm start` command intiate the regular node server, and the `npm run dev` start the nodemon server, i believe, and nodemon allows us to make changes to the project and ave the server automatically update
- we will install further dependencies later as we need them

### React Client SetUp

- to start this process we will navigate to the 'client' direct adn make our react app with `npx create-react-app .`, which will create a react app in the current directory
- **note** the first time I did this, i was told i was using node 12 and needed at least, and to upgrade I had to install node version manager (nvm), I did this with thec ommand `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash` as described in the NVM github (https://github.com/nvm-sh/nvm#installing-and-updating), then had to restart the terminal and did `nvm --version` to confirm that it was installed, then did `nvm install node` which now installed the newest node 20, and only now did I do `npx create-react-app .`, and it worked
    - **note** create the react app in WSL in vscode is extremely slow, WSL tends to work a lot slower in general i have noticed but it hasbeen creating the ap for over 30 minutes, the network using seems to be particularly slow
- once the react app is set up, we will have a bunch fo default files in the 'src' directory, and in the video i am watching he removes all the default CSS and JS from the app.js and app.css files, and then uses the short hand command `rfce ->` (where -> means tab), to auto fill a standard react functional component with an export
```
import React from 'react'

function App() {
  return (
    <div>App</div>
  )
}

export default App
```
- so just so we have some sort of default component that will be shown

## Backend API Setup (Express)

- so now we want to set up our express API that will serve react data from the backend
- we do this like we did in the course by importing express using the require keyword, and defining a handler for a get request from the front-end:
```
const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
})
```
- so the main details of this are in the 'completeWebDevBootcamp/NodeJS' notes, but in general we are telling express to send a response of this users JSON object to react whenever a get request is made to the "/api" route
- we then want to write the `app.listen()` function that will get called when we start our server, so here we are telling express to start the server on port 5000, and when it does to call the callback function which will just print the server started message
- so now if we go to our web browser and navigate to locahost:5000, we will see the classic `cannot GET /` message when there is no porper get handler for the route, and if we then go to instead `localhost:5000/api`, we will see printed out on the screen `{"users":["userOne","userTwo","userThree"]}` as expected!
- so nothing we havent done so far int he node course, our next step is to use react to fetch this api, and display the users as we wish with react styling/css/html

## API Fetching With React

- so we notice that we set the port number for express in the above section to 5000, even though react runs by default on port 3000, in deployment we will want these two to run on the same port, and have our backend serve our front end, but for development it is very useful to have them running seperately so we can work on them more independantly
- to do this we run them on seperate ports as we are doing, but we still want react to be able to send requests to our backend, and we do this by adding a "proxy" path to the react package.json file, which tells react to send any request that is unrecognized to the API server

