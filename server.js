// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const express = require('express');

// Create an instance of the express application
const app = express();

// Set the port for the server to listen on
const port = 3000; // You can choose any port number


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require('cors');

app.use(cors());

app.use(express.static('website'));

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/projectData',(req,res)=>{
    res.send(projectData);
})
app.post('/addData', (req, res) => {
    projectData = {
        ...projectData,
        userData: {
            temperature: req.body.temp,
            date: req.body.date,
            userResponse: req.body.userinput, // Fix: Correctly map req.body.userinput
        },
    };
    res.send("data added");
    console.log(projectData);
});