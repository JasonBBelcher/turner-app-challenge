require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');


const titles = require('./routes/titles');

const app = express();
app.use(cors());
const morgan = require('morgan');
app.use(morgan('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser())
app.use('/api/v1/titles', titles);


var distDir = __dirname + '/dist/turner-app-challenge/';
app.use(express.static(distDir));
app.get('*', (req, res) => {
    res.sendFile(path.join(distDir));
});





module.exports = app;