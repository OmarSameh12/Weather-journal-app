// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const express = require('express');

// Create an instance of the express application
const app = express();

// Set the port for the server to listen on
const port = 3000; // You can choose any port number

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

app.get('/projectData',(req,res)=>{
    res.send(projectData);
})
app.post('/addData', (req, res) => {
    projectData = {
        ...projectData,
        userData: {
            temperature: req.body.temperature,
            date: req.body.date,
            userResponse: req.body.userinput, // Fix: Correctly map req.body.userinput
        },
    };
    res.send("data added");
    console.log(projectData);
});