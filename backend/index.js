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
const { log } = require('console');
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

io.on('connection', (socket) => {
  console.log('Client Connected', socket.id);

  socket.on('event', (message) => {
    console.log(message);
    io.emit('event', `${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

expressjwt({secret: SECRET_KEY, algorithms: ['HS256']});

app.use((req, res, next) => {
    console.info(`Received a ${req.method} request for ${req.url}`);
    next();
})

app.use('/events', eventsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to App.');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.error('NOT FOUND', req.url);
  res.status(404).send({ message: 'Request API not found' });
  // next(createError(404));
});

app.listen(PORT, () => console.log('app listening on 3000...!'));