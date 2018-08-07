import React, { Component } from 'react';
import '../App.css';
import Header from '../components/Header';
import Circles from '../components/Circles';
//import GamesList from '../components/GamesList';
import GameCreate from '../components/GameCreate';

class Games extends Component {
  render() {
    return (
      <div className="Games">
        <div className="blurred" style={{top: '50px'}}>
          <Circles/>
        </div>
        <Header/>
        <GameCreate/>
      </div>
    );
  }
}

export default Games;