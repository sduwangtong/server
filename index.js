const express =require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost:27017/auth');

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));

router(app);
// Server

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);