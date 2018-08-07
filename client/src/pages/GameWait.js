import React, { Component } from 'react';
import '../App.css';
import Header from '../components/Header';
import Circles from '../components/Circles';
//import GamesList from '../components/GamesList';
import GameCreate from '../components/GameCreate';
import socketIOClient from 'socket.io-client';
import { getCookie } from '../lib';

class GameWait extends Component {
    constructor() {
        super();
        this.state = {
            game: {}
        };
    }
    componentDidMount() {
        const socket = socketIOClient('http://localhost:5000');
        socket.emit('gamewait-getgame', getCookie('uid'));     
        socket.on('gamewait-getgame', (game) => {
            console.log('got it');
            console.log(game);
        });  
    }

    render() {
        //const socket = socketIOClient('http://localhost:5000');

        return (
            <div className="GameWait">
                <div className="blurred" style={{ top: '50px' }}>
                    <Circles />
                </div>
                <Header />
            </div>
        );
    }
}

export default GameWait;