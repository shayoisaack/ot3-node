import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { getCookie } from '../lib';

class PlayerList extends Component {
    constructor() {
        super();
        this.state = {
            players: []
        }
    }

    componentDidMount() {
        const socket = socketIOClient('http://localhost:5000');

        socket.emit('playerlist-get', getCookie('gameId'));

        socket.on('playerlist-get', (players) => {
            console.log('players:', players);
            this.setState({ players: players });
        });
    }

    render() {
        return (
            <div className="PlayerList">
                <div className="TextTitle">Players:</div>
                <ol>
                {
                    this.state.players.map(player =>
                        <li className="PlayerListItem" dataid={player.uid}>{player.userName}</li>)
                }
                </ol>
            </div>
        );
    }
}

export default PlayerList;
