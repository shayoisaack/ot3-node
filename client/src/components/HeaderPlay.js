import React, { Component } from 'react';
import '../App.css';
import './Header.css';
import socketIOClient from 'socket.io-client';
import { getCookie, playerInGame, link } from '../lib';

const socket = socketIOClient(link);

console.log('inside header play');

class Header extends Component {
  constructor() {
    super();
    this.state = {
      myName: 'not logged in',
      game: { players: {} },
      nextNumber: 1
    }
  }
  componentDidMount() {
    console.log('bro', this.state.myName);
    if (getCookie('uid') !== null)
      socket.emit('login-check', getCookie('uid'));
    else
      console.log('login-check: not even cookie is set bro :-(');

    socket.on('login-check', myName => {
      if (myName !== null) {
        console.log('login-check: myName = ', myName);
        let state = JSON.parse(JSON.stringify(this.state));
        state.myName = myName;
        this.setState(state);
      }
      else
        console.log('login-check: fail, not logged in server');
    });

    socket.emit('gamewait-getgame', getCookie('gameId'));
    socket.on('play-update-score', obj => {
      if (!playerInGame(obj.game, getCookie('uid')))
        return;

      console.log('play-update-score:', obj);

      //update game current nubmer & player scores
      let state = JSON.parse(JSON.stringify(this.state));
      state.game.currentNumber = obj.currentNumber;
      state.game.players[obj.playerId].score++;
      this.setState(state);
    });

    socket.on('play-update-next-number', obj => {
      if (!playerInGame(obj.game, getCookie('uid')))
        return;
      let state = JSON.parse(JSON.stringify(this.state));
      state.nextNumber = obj.game.currentNumber + 1;
      this.setState(state);
    });
  }
  render() {

    socket.on('gamewait-getgame', (game) => {
      //set player scores to zero
      Object.keys(game.players).map((uid, index) => {
        game.players[uid].score = 0;
      });
      //update state with game
      let state = JSON.parse(JSON.stringify(this.state));
      state.game = game;
      this.setState(state);
    });

    return (
      <div className="Header">
        {Object.keys(this.state.game.players).map((uid, index) =>
          <span className="headerItem playerScoreItem" style={{ float: 'left' }}> {this.state.game.players[uid].userName}-{this.state.game.players[uid].score} </span>
        )}
        <span className="headerItem">
          {this.state.nextNumber} | {this.state.myName}
        </span>
      </div>
    );
  }
}

export default Header;