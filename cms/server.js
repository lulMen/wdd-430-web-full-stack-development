// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// import the routing file to handle the default (index) route
const index = require('./server/routes/app');
const messageRoutes = require('./server/routes/messages.js');
const contactRoutes = require('./server/routes/contacts');
const documentsRoutes = require('./server/routes/documents');

const app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentsRoutes);

// Establish a connection to the mongo database
mongoose
    .connect('mongodb://127.0.0.1:27017/cms')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(error => {
        console.error('Connection failed: ', error);
    });

// Tell express to map all other non-defined routes back to the index page
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
// });
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
    console.log('API running on localhost: ' + port)
});
