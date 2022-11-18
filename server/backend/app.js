const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('../helpers/config');
const appointment_handler = require("./handlers/appointment_handler");
const clinic_data_handler = require("./handlers/authorization_handler");
const authorization_handler = require("./handlers/clinic_data_handler");

// Variables
const port = process.env.PORT || config.admin.port;
const version = 'v1'

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

app.use(appointment_handler);
app.use(authorization_handler);
app.use(clinic_data_handler);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/' + config.version + '/*', function (req, res) {
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