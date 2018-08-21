import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import Header from '../components/Header';
import Circles from '../components/Circles';
import socketIOClient from 'socket.io-client';
import { getCookie } from '../lib';
import './Play.css';

const socket = socketIOClient('http://localhost:5000');

class App extends Component {
    constructor() {
        super();
        this.state = {
            playWaitTimer: 5
        }
    }
    componentDidMount() {
        console.log(getCookie('gameId'));

        var intervalId = setInterval(() => {
            console.log('timer reduced', this.state.playWaitTimer);
            this.setState({
                playWaitTimer: --this.state.playWaitTimer
            });

            if (this.state.playWaitTimer < 1) {
                window.clearInterval(intervalId);
                this.startGame();
            }
        }, 1000);
    }
    render() {
        socket.on('user-connected', (id) => {
            console.log('id', id);
        });
        return (
            <div className="App">
                <Header />
                <Circles />
                {this.state.playWaitTimer > 0 ?
                    <div className="PlayWait">
                        <div className="PlayWaitMessage">Game will start in <h3 className="PlayWaitTimer">{this.state.playWaitTimer}</h3></div>
                    </div>
                    : null
                }
            </div>
        );
    }

    startGame() {

    }
}

export default App;