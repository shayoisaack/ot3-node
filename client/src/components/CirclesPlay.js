import React, { Component } from 'react';
import './Circles.css';
import Circle from './Circle';
import { findHighestNo, loadNumbers } from '../load_game.js';
import { getCookie, playerInGame, link } from '../lib';
import socketIOClient from 'socket.io-client';
import Button from './Button';

const socket = socketIOClient(link);

let winH = window.innerHeight;
let winW = window.innerWidth;

class Circles extends Component {
  constructor() {
    super();
    this.state = {
      circles: [],
      game: {
        winH: winH,
        winW: winW
      },
      end: {
        winner: {},
        show: false,
        rankedPlayers: []
      }
    };
  }
  componentDidMount() {
    socket.emit('gamewait-getgame', getCookie('gameId'));

    socket.on('gamewait-getgame', (game) => {
      game.winH -= 51;
      //set player scores to zero
      Object.keys(game.players).map((uid, index) => {
        game.players[uid].score = 0;
      });

      let state = JSON.parse(JSON.stringify(this.state));
      console.log('window:', game.winH, game.winW);

      //load circles
      let highestNumber = findHighestNo(game.winH, game.winW);
      console.log(highestNumber);
      let circles = loadNumbers(highestNumber, game.seed, game.winH, game.winW);
      state.circles = circles;

      //update state with game
      state.game = game;
      this.setState(state);
    });

    socket.on('play', obj => {
      if (!playerInGame(obj.game, getCookie('uid')))
        return;

      //update game current nubmer & player scores
      let state = JSON.parse(JSON.stringify(this.state));
      state.game.currentNumber = obj.game.currentNumber;
      state.game.players[obj.playerId].score++;
      state.circles[obj.game.currentNumber - 1].color = state.game.players[obj.playerId].color;

      //console.log(obj.game.currentNumber, this.state.circles.length + 1);
      //if (obj.game.currentNumber >= 3) {
      if (obj.game.currentNumber >= this.state.circles.length) {
        console.log('game has ended');
        state.end.show = true;
        let winningScore = 0;
        let winner = {};
        let rankedPlayers = [];
        Object.keys(state.game.players).map((uid, index) => {
          let player = state.game.players[uid];
          if (player.score > winningScore) {
            winningScore = player.score;
            winner = player;
          }

          rankedPlayers.push(player);

          //calculate points for each player
          let points = 5//5 points for participation
          points += player.score//score TODO: score * number of players
          player.points = points;
        });
        state.end.winner = winner;

        winner.points += 50;//50 points for winning
        winner.won = true;
        console.log('gameover:', state.game.players);

        //commit points to server
        socket.emit('circlesplay-leaderboard-set', state.game);

        rankedPlayers.sort((a, b) => {
          return (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
        });
        state.end.rankedPlayers = rankedPlayers;
      }
      this.setState(state);
    });
  }
  render() {


    return (
      <div>
        <div className={this.state.end.show ? "blur Circles" : "Circles"} style={{ height: (this.state.game.winH) + "px", width: this.state.game.winW +"px" }}>
          {this.state.circles.map(circle =>
            <Circle onClick={evt => this.play(evt, circle)} key={circle.id} number={circle.id} x={circle.x + "%"} y={circle.y + "%"} color={circle.color} />
          )}
        </div>
        {this.state.end.show ?
          <div className="overlay" style={{ height: (winH - 51) + 'px' }}>
            <div className="results row">
              <span>The winner is</span>
              <h1>{this.state.end.winner.userName}</h1>
              <div>Ranking:</div>
              <table className="Ranking">
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
                {this.state.end.rankedPlayers.map((player, index) => 
                  <tr>
                    <td>{index+1}</td>
                    <td>{player.userName}</td>
                    <td>{player.score}</td>
                  </tr>
                )}
              </table>
              <a href='/leaderboard' style={{textDecoration: 'none'}}><Button text="Go to Leaderboard" style={{backgroundColor: this.state.end.winner.color, marginTop: '12px'}}/></a>
            </div>
          </div>
          : null
        }
      </div>
    );
  }

  play(evt, circle) {
    socket.emit('play', { gameId: getCookie('gameId'), number: circle.id });
  }
}

export default Circles;