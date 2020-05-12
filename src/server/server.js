// Setup empty JS object to act as endpoint for all routes
projectData = {};

const path = require("path");
const express = require("express");
const app = express();
var cors = require("cors");

/*Dependencies*/
const bodyParser = require("body-parser");

/* Middleware*/
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Initialize the main project folder
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.get("/giveMeProjectData", function (req, res) {
  res.send(projectData);
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
