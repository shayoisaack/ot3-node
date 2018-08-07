const express = require('express');
const app = express();
const cors = require('cors');
const uuid = require('uuid/v1');
const session = require('express-session');
const socketIO = require('socket.io');
const http = require('http');

const server = http.createServer(app)

const io = socketIO(server);

app.use(cors());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'here come the sessions',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

let users = [];
let games = [];

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/adduser', (req, res) => {
  if(req.session.uid === undefined){
    console.log('adding user...', req.query.userName);
    let user = {uid: uuid(), userName: req.query.userName};
    users[user.uid] = (user);
    req.session.uid = user.uid;
    console.log('users: ', users);
    res.json(user);
  }
  else{
    res.redirect('/');
  }
});

app.get('/gamecreate', (req, res) => {
  console.log('uid:', req.query.uid);
  let game = {
    creatorId: req.query.uid,
    creatorName: users[req.query.uid].userName,
    players: []
  }
  games[req.query.uid] = game;
  res.json(game);
});

io.on('connection', socket => {
  console.log('user connected');

  socket.on('gamewait-getgame', (uid) => {
    console.log('getting game for: ', games[uid]);
    io.to(socket.id).emit('gamewait-getgame', games[uid]);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});

const port = 5000;

server.listen(port, () => `Server running on port ${port}`);