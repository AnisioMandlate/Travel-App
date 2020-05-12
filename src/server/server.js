// Setup empty JS object to act as endpoint for all routes
projectData = {};

const path = require("path");
const express = require("express");
const app = express();

/*Dependencies*/
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// GET route
app.get("/", function (req, res) {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// Setup Server
const port = 5000;

//Spin up server
app.listen(port, listening);

//Callback of the function listening
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
