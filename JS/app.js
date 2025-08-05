// TODO Module
const express = require('express')
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// TODO Fichiers
const connectMongoDB = require('./data/mongoData');

// TODO Coniguration ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views')
app.set('layout', 'layout')

// TODO Middleware
app.use(express.json());
app.use(expressLayouts);


// TODO Connexion à MongoDB
connectMongoDB() 

app.use('/', (req, res) => {
    console.log('Request received');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});