// TODO Module
const express = require('express')
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// TODO Fichiers
const connectMongoDB = require('./data/mongoData');
const routerPage = require('./routes/routePage');
const router = require('./routes/routePage');

// TODO Coniguration ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views')
app.set('layout', 'layout')

// TODO Middleware
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));


// TODO Connexion à MongoDB
connectMongoDB() 

app.use('/', routerPage);

app.listen(3000, () => {
    console.log('Server is running on port: http://localhost:3000/');
});