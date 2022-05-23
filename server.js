// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies require bodyparser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port , ()=>{
    console.log('server is running on local port: '+port);
})

//saving app data in server's project data
app.post('/saveData',(req,res)=>{
    projectData = req.body;
    res.status(201).send(); //setting the response status
});

//returning project data to App
app.get('/getData',(req,res)=>{
    res.json(projectData);
});
