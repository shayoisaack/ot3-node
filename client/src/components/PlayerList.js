import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { getCookie, link } from '../lib';

class PlayerList extends Component {
    constructor() {
        super();
        this.state = {
            players: []
        }
    }

    componentDidMount() {
        const socket = socketIOClient(link);

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
                    Object.keys(this.state.players).map((uid, index) =>
                        <li className="PlayerListItem" dataid={this.state.players[uid]}>{this.state.players[uid].userName}</li>)
                }
                </ol>
            </div>
        );
    }
}

export default PlayerList;
