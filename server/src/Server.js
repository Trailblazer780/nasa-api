let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;
let sanitizer = require('express-sanitizer');
let ObjectId = require('mongodb').ObjectId;

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbData";

// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());

// add middleware to work with incoming JSON
app.use(express.json());
app.use(sanitizer());

const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

// wildcard to handle all other non-api URL routings and point to index.html
app.use((request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(80, () => console.log("Listening on port 8080"));