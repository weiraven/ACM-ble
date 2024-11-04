// load environment variables
require('dotenv').config();

// required modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// import routes
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

// create app
const app = express();

// configure app
let port = process.env.PORT || 3000;
let host = process.env.HOST || 'localhost';
app.set('view engine', 'ejs');
const mongoUri = process.env.MONGO_URI;

// connect to MongoDB Atlas
(async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB Atlas');
        //start the server
        app.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
})();

// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// use mainRoutes.js for home, about, contact
app.use('/', mainRoutes);

// events-related routing and functions are handled by eventRoutes.js and eventController.js
app.use('/events', eventRoutes); 

// at this point if a matching route is not found, we begin error handling
app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

// if all else fails, send code 500 response
app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});