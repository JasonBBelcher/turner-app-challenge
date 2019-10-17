const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');


const titles = require('./routes/titles');

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser())

app.use('/api/v1/titles', titles);

module.exports = app;