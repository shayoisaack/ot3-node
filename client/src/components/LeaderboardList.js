import React, { Component } from 'react';
import './Circles.css';
import Circle from './Circle';
import { findHighestNo, loadNumbers } from '../load_game.js';
import { getCookie, playerInGame, link } from '../lib';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(link);

class LeaderboardList extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        socket.emit('leaderboardlist-get', {});
        socket.on('leadeboardlist-get', list => {});
    }
    render() {


        return (
            <div className="overlay" style={{ height: (window.innerHeight - 51) + 'px' }}>
                <div className="results row">
                    <span>The winner is</span>
                    {/* <h1>{this.state.end.winner.userName}</h1> */}
                    <div>Ranking:</div>
                    <table className="Ranking">
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        {/* {this.state.end.rankedPlayers.map((player, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{player.userName}</td>
                                <td>{player.score}</td>
                            </tr>
                        )} */}
                    </table>
                </div>
            </div>
        );
    }
}

export default LeaderboardList;