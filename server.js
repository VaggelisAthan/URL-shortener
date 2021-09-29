'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongo = require('mongodb')
const bodyParser = require('body-parser');
const { MongoTopologyClosedError } = require('mongoose/node_modules/mongodb');


const port = process.env.PORT || 3000;

//Database Config;
const connection = require('./config/db.config');
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => console.log('MongoDB database connection established successfully'));

// Basic Configuration
app.use(express.urlencoded({extended: false}))
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json());
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//routes config
app.use(express.json({
  extended:false
}))//parse incoming request body in Json format
app.use('/api/shorturl', require('./routes/redirect'))
app.use('/', require('./routes/url'))


//Listen for requests

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

