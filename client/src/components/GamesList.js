import React, { Component } from 'react';
import { getCookie, setCookie, link } from '../lib';
import socketIOClient from 'socket.io-client';
import './GamesList.css';
import Button from './Button';
const socket = socketIOClient(link);

var winH = window.innerHeight;
var winW = window.innerWidth;

class GamesList extends Component {
  constructor() {
    super();
    this.state = {
      games: []
    };
  }
  componentDidMount() {
    socket.emit('gameslist-get', getCookie('uid'));
  }
  render() {
    socket.on('gameslist-get', (games) => {
      console.log('games:', games);
      this.setState({ games: games });
    });

    socket.on('gameslist-join', (game) => {
      console.log('going to:', game);
      setCookie('gameId', game.id);
      window.location = '/gamewait';
    });

    return (
      <div className="GamesList" style={{ height: (winH - 51) + "px" }}>
        {this.state.games.map(game =>
          <div className="gamesListItem">
            <span>{game.creatorName}'s game</span>
            <Button gameId={game.id} onClick={env => this.joinGame(env, game)} text='Play' style={{ width: '100px', float: 'right', padding: '3px' }} />
          </div>
        )}
      </div>
    );
  }

  joinGame(env, game) {
    console.log('joining game: ', game);
    socket.emit('gameslist-join', { uid: getCookie('uid'), gameId: game.id });
  }
}

export default GamesList;
