const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const apiController = require('./controller/apiController');

var port = process.env.PORT || 3000;


apiController(app);

app.listen(port);   
