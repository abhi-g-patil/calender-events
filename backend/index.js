const createError = require('http-errors');
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");

const eventsRouter = require('./routes/events');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'secret';
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

expressjwt({secret: SECRET_KEY, algorithms: ['HS256']});

app.use((req, res, next) => {
    console.info(`Received a ${req.method} request for ${req.url}`);
    next();
})

app.use('/events', eventsRouter);

app.get('/home', expressjwt({secret: SECRET_KEY, algorithms: ['HS256']}), (req, res) => {
    console.log('req.auth', req.auth)
    res.send('hello');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => console.log('app listening on 3000...!'));