const express = require('express');
const app = express();
const cors = require('cors');
const uuid = require('uuid/v1');
const sess = require('express-session');
const socketIO = require('socket.io');
const http = require('http');
var bodyParser = require('body-parser');
const getGame = require('./serverlib.js').getGame;
//var sessionstore = require('sessionstore');
//var sessionStore = sessionstore.createSessionStore();
//var RedisStore = require('connect-redis')(sess);
//var redis = require("redis").createClient();
let session = sess({
  //store: new RedisStore({host: 'localhost', port: 6379, client: redis}),
  secret: "here come the sessions",
  resave: true,
  saveUninitialized: true
});
let sharedsession = require("express-socket.io-session");

const server = http.createServer(app)

const io = socketIO(server);

app.use(cors());

// Use express-session middleware for express
app.use(session);
// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, {
  autoSave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'here come the sessions',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

let users = [];
let games = [];

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/adduser', (req, res) => {
  if (req.session.uid === undefined) {
    console.log('adding user...', req.query.userName);
    let user = { uid: uuid(), userName: req.query.userName };
    users[user.uid] = (user);
    req.session.uid = user.uid;
    console.log('users: ', users);
    res.json(user);
  }
  else {
    res.redirect('/');
  }
});

app.get('/gamecreate', (req, res) => {
  let game = {
    creatorId: req.query.uid,
    creatorName: users[req.query.uid].userName,
    players: []
  }
  games[req.query.uid] = game;
  console.log('gamecreate', games);
  res.json(game);
});

app.get('/test-login', (req, res) => {
  req.session.userName = req.query.userName;
  //req.session.save();
  console.log('userName:', req.query.userName);
  res.send({ userName: req.query.userName })
});

app.get('/login', (req, res) => {
  let user = {
    uid: uuid(),
    userName: req.query.userName
  };
  users[user.uid] = user;

  req.session.uid = user.uid;
  req.session.userName = user.userName;
  //req.session.user = user;
  //req.session.save();

  console.log('userName:', req.query.userName);
  res.send(user);
});

app.get('/test-login-check', (req, res) => {
  console.log('userName-check', req.session.userName);
  res.send({ userName: req.session.userName });
});

io.on('connection', socket => {
  //console.log('user connected:', socket.id);

  if (socket.handshake.session.uid){
    console.log('session logged for:', socket.id);
    users[socket.handshake.session.uid].sid = socket.id;
  }
  else
    console.log('session not logged for: ', socket.id);

  socket.emit('user-connected', null);

  socket.on('login-check', uid => (function (socket) {
    //console.log('sessions: login-check:', socket.handshake.session.uid, socket.handshake.session.userName);
    //console.log('login-check: uid', uid);
    if (socket.handshake.session.uid) {
      //console.log('login-check: pass', socket.handshake.session.uid);
      socket.emit('login-check', socket.handshake.session.userName);
    }
    else {
      //console.log('login-check: fail', uid);
      io.sockets.emit('login-check', null);
    }
  })(socket));

  socket.on('gamecreate', (uid) => {
    //console.log('sessions: gamecreate:', socket.handshake.session.uid, socket.handshake.session.userName);
    let game = {
      id: uuid(),
      creatorId: socket.handshake.session.uid,
      creatorName: socket.handshake.session.userName,
      players: {}
    }
    game.players[socket.handshake.session.uid] = users[socket.handshake.session.uid];
    // games[uid] = game;
    games.push(game);

    console.log('gamecreate', game);
    socket.emit('gamecreate', game);
    io.sockets.emit('gameslist-get', games);
  });

  socket.on('gamewait-getgame', (gameId) => {
    //console.log('getgame:', getGame(games, gameId));
    socket.emit('gamewait-getgame', getGame(games, gameId));
  });

  socket.on('gamewait-getgame-other', (obj) => {
    for (let i = 0; i < games.length; i++) {
      if (games[i].id === obj.gameId) {
        io.sockets.emit('gamewait-getgame-other', games[i]);
      }
    }
  });

  socket.on('playerlist-join', (uid) => {
    io.sockets.emit('playerlist-join', {});
  });

  socket.on('playerlist-get', (gameId) => {
    let game = getGame(games, gameId);
    socket.emit('playerlist-get', game.players);
  });

  socket.on('gameslist-get', (uid) => {
    console.log('gameslist:', games);
    socket.emit('gameslist-get', games);
  });

  socket.on('gameslist-join', (obj) => {
    console.log('gameslist-join: entering');
    let game = null;
    for (let j = 0; j < games.length; j++) {
      if (games[j].id === obj.gameId) {
        games[j].players[socket.handshake.session.uid] = users[socket.handshake.session.uid];
        console.log('added player to game:', games[j].players);
        game = games[j];
        break;
      }
    }
    //let game = getGame(games, obj.gameId);
    console.log('user joining game:', obj.uid, game);
    socket.emit('gameslist-join', game);
    Object.keys(game.players).map((uid, index) => {
      console.log('playerlist-get: sending playerlist list to:', game.players[uid]);
      io.to(game.players[uid].sid).emit('playerlist-get', game.players);
      console.log('socket id check:', socket.id === game.players[uid].sid);
    });
  });

  socket.on('gamewait-startgame', gameObj => {
    console.log('starting game:', gameObj);
    let game = getGame(games, gameObj.id);
    Object.keys(game.players).map((uid, index) => {
      io.sockets.emit('gamewait-startgame', game);
      console.log('starting game for:', users[uid]);
    });
  });

  socket.on('disconnect', () => {
    //console.log('user disconnected')
  });
});

const port = 5000;

server.listen(port, () => `Server running on port ${port}`);