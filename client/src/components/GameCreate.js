import React, { Component } from 'react';
import Button from './Button';
import {setCookie, getCookie, eraseCookie} from '../lib.js';
import socketIOClient from 'socket.io-client';

var winH = window.innerHeight;
var winW = window.innerWidth;

const socket = socketIOClient('http://localhost:5000');

class GameCreate extends Component {
    constructor() {
      super();
      this.state = {
        game: {}
      };
    }
    componentDidMount() {
    }
  render() {
    socket.on('gamecreate', (game) => {
      console.log('game:', game);
      this.setState({
        game: game
      });
      setCookie('gameId', game.id);
      window.location = '/gamewait';
    });
    return (
        <Button text='Create new game' style={{backgroundColor: 'green', width: '180px', margin: 'auto'}} onClick={env => this.createNewGame(env)}/>
    );
  }

  createNewGame(env){
    console.log(getCookie('uid'));
    socket.emit('gamecreate', getCookie('uid'));
  }
}

export default GameCreate;
