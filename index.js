const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Create an instance of the express app
const app = express();

// Set up middleware
app.use(morgan("dev")); // logs requests to the console
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", function(req, res) {
    res.send("Hello World!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});