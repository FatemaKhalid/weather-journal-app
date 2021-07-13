// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8050;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//  GET route 
const getData = (req, res) => {
    res.send(projectData);
    console.log({ projectData });
}
app.get('/all', getData)

//  POST ROUTE 
const saveWeather = (req, res) => {
    // A new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST
    newEntry = {
        date: req.body.date,
        feeling: req.body.feeling,
        temp: req.body.temp
    }
    projectData = newEntry;
    res.send(projectData);
    console.log({ projectData });
}
app.post('/saveWeather', saveWeather);
