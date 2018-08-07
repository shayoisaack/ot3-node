import React, { Component } from 'react';
import Button from './Button';
import {setCookie, getCookie, eraseCookie} from '../lib.js';

var winH = window.innerHeight;
var winW = window.innerWidth;

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
    return (
      <div className="GameCreate" style={{position: 'absolute', width: '100%', textAlign: 'center'}}>
        <Button text='Create new game' style={{backgroundColor: 'green', width: '180px', position: 'absolute', left: '25%', marginTop: '10px'}} onClick={env => this.createNewGame(env)}/>
      </div>
    );
  }

  createNewGame(env){
    console.log(getCookie('uid'));
    fetch('http://localhost:5000/gamecreate?uid='+getCookie('uid'),{
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(game => {
      console.log(game);
      this.setState({
          game: game
      });
      window.location = '/gamewait'
    });
  }
}

export default GameCreate;
