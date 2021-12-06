const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const empRouter = require('./routes/employeeRoutes.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://vatsalbhimani:Vatsal123@employee.kr0a9.mongodb.net/101282605_assignment2?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }
).then(() => {
    console.log("connection Successfully!!!");    
}).catch(err => {
    console.log('Could not connect to the database./n', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Assignment 2</h1>");
});

app.use(empRouter);

let SERVER_PORT = process.env.PORT || 9090
app.listen(SERVER_PORT)
console.log(`Server running at http://localhost:/${SERVER_PORT}`)
