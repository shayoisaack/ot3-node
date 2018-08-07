import React, { Component } from 'react';

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
        fetch('http://localhost:5000/gameslist?uid=',{
          method: 'GET',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          console.log(games);
          this.setState({
              games: games
          });
        });
    }
  render() {
    return (
      <div className="GamesList" style={{height: (winH - 51)+"px"}}>
          {this.state.games.map(game => 
            <Game key={game.id} gameid={game.id}/>
          )}
      </div>
    );
  }
}

export default GamesList;
