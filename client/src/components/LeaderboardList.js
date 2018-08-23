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
            list: []
        }
    }
    componentDidMount() {
        socket.emit('leaderboardlist-get', {});
        socket.on('leaderboardlist-get', list => {
            console.log('list:', list);
            this.setState({list: list});
        });
    }
    render() {
        return (
            <div className="overlay" style={{ height: (window.innerHeight - 51) + 'px' }}>
                <div className="results row">
                    <h1>Leaderboard</h1>
                    <table className="Ranking">
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Win</th>
                            <th>Points</th>
                        </tr>
                        {this.state.list.map((row, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td dataId={row.uid}>{row.userName}</td>
                                <td>{row.won}</td>
                                <td>{row.points}</td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
        );
    }
}

export default LeaderboardList;