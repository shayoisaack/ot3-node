import React, { Component } from 'react';
import '../App.css';
import Header from '../components/Header';
import Circles from '../components/Circles';
//import GamesList from '../components/GamesList';
import GameCreate from '../components/GameCreate';
import socketIOClient from 'socket.io-client';
import { getCookie } from '../lib';
import './GameWait.css';
import Button from '../components/Button';
import PlayerList from '../components/PlayerList';

const socket = socketIOClient('http://localhost:5000');

class GameWait extends Component {
    constructor() {
        super();
        this.state = {
            game: {},
            playerList: []
        };
    }
    componentDidMount() {
        if (getCookie('gameId') !== null)
            socket.emit('gamewait-getgame', getCookie('gameId'));
        else
            console.log('no games to wait for');
    }

    render() {

        socket.on('gamewait-getgame', (game) => {
            console.log('getgame:', game);
            this.setState({
                game: game
            });
        });

        socket.on('gamewait-getgame-other', (game) => {
            console.log('getgame-other:', game);
            this.state.setState({
                game: game
            });
        });

        return (
            <div className="GameWait">
                <div className="blurred" style={{ top: '50px' }}>
                    <Circles />
                </div>
                <div style={{ position: 'absolute', width: '100%', boxSizing: 'border-box' }}>
                    <Header />
                    <div className="GameWaitBox">
                        <div className='gameCreator'>{this.state.game.creatorName}'s game</div>
                        <Button className="GameWaitStartButton" text='Start game' style={{ width: '180px', left: '25%' }} />
                        <PlayerList />
                    </div>
                </div>
            </div>
        );
    }
}

export default GameWait;