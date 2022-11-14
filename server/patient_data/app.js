const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const mqttHandler = require('../backend/mqtt_handler');
const config = require('../backend/config');

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.userDataUser.name + ':' + config.userDataUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserDB';
const port = process.env.PORT || config.userDataUser.port;
const version = 'v1'

// MQTT Client
const mqttClient = new mqttHandler()
mqttClient.connect()

// Connect to MongoDB
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
let app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
// Parse requests of content-type 'application/json'
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api/' + version, function (req, res) {
    res.json({'message': 'Dentistry portal API endpoint.'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/' + version + '/*', function (req, res) {
    res.status(404).json({'message': 'Not Found'});
});

app.use('/api/*', function (req, res) {
    res.status(404).json({'message': 'Not Found'});
});

// Serve static assets
let root = path.normalize(__dirname + '/..');
let client = path.join(root, 'client', 'dist');
app.use(express.static(client));


// Error handler (i.e., when exception is thrown) must be registered last
let env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.error(err.stack);
    let err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});


app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/` + version);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;

