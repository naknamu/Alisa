const express = require("express");
const morgan = require("morgan");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");
const homeRouter = require("./routes/home");
const apiRouter = require("./routes/api");
const compression = require("compression");
const helmet = require("helmet");

// Enable env variables
require("dotenv").config();

// Create an instance of the express app
const app = express();

// Connect to mongodb
const { config } = require("./config");
let mongoDB = config.mongoURI;

mongoose.set("strictQuery", false);
mongoose.connect(mongoDB)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up rate limiter: maximum of 100 requests per 15 minute
// const RateLimit = require("express-rate-limit");
// const limiter = RateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });
// Apply rate limiter to all requests
// app.use(limiter);

// Set up middleware
app.use(compression()); // Compress all routes
app.use(helmet());
app.use(morgan("dev")); // logs requests to the console
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", homeRouter);
app.use("/api", apiRouter);

// Define routes
app.get("/", function(req, res) {
    res.send("Hello World!");
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
})

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err});
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});