const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 5000;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customer_app'
});

// connect to database
db.connect((err) => {
    if (err) {throw err;}
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client


app.use('/menu', require('./routes/menu'))
app.use('/tenant', require('./routes/tenant'))
app.use('/orders', require('./routes/orders'))
app.use('/payment', require('./routes/payment'))
app.use('/notifications', require('./routes/notifications'))
app.use('/account', require('./routes/account'))


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
