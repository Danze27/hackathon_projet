const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config();
const urlBase = process.env.dataBaseUrl;

// TODO Document data
const Document = require('../model/Document');
const dataDocuments = require('./dataDocument');

// TODO Category data
const Category = require('../model/Category');
const categories = require('./dataCategory');

module.exports = async () => {
    try {
        await mongoose.connect(urlBase)
        console.log('MongoDB connected');

        // await Document.insertMany(dataDocuments);
        // console.log('Documents inserted successfully');

        // await Category.insertMany(categories);
        // console.log('Categories inserted successfully');
    } catch (err) {
        throw err;
            
    }
 }