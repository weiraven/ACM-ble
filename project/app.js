// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const eventRoutes = require('./routes/eventRoutes');

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/about', (req, res)=>{
    res.render('about');
});

app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.post('/contact', (req, res)=>{
    const { email, subject, message } = req.body;
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    res.redirect('/thankyou');
});

app.get('/thankyou', (req, res)=>{
    res.render('thankyou');
});

// all events-related routing and functions are handled by eventRoutes.js and eventController.js
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

// start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})