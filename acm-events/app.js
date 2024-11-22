// Load environment variables
require('dotenv').config();

// Required modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Import routes
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

// Create app
const app = express();

// Configure app
let port = process.env.PORT || 3000;
let host = process.env.HOST || 'localhost';
app.set('view engine', 'ejs');
const mongoUri = process.env.MONGO_URI;

// Connect to MongoDB Atlas
(async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB Atlas');

        // Detect if app is running in production or development
        const isNodemon = process.argv[0].includes('nodemon');
        const mode = process.env.NODE_ENV || 'development';
        const runner = isNodemon ? 'nodemon' : 'node';

        // Start the server
        app.listen(port, host, () => {
            console.log(`Server is running in ${mode} with ${runner} on http://${host}:${port}`);
        });
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
})();

// Mount middleware
app.use(session({
    secret: 'scht0lteheimReinb4chthe3rd',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000, secure: process.env.NODE_ENV === 'production'},
    store: new MongoStore({mongoUrl: mongoUri})
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Use mainRoutes.js for home, about, contact
app.use('/', mainRoutes);

// Use userRoutes.js for new user creation, login, profile, and logout
app.use('/users', userRoutes)

// Events-related routing and functions are handled by eventRoutes.js and eventController.js
app.use('/events', eventRoutes); 

// At this point if a matching route is not found, we begin error handling
app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

// If all else fails, send code 500 response
app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});