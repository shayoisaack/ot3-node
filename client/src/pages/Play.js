import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import HeaderPlay from '../components/HeaderPlay';
import CirclesPlay from '../components/CirclesPlay';
import socketIOClient from 'socket.io-client';
import { getCookie, link } from '../lib';
import './Play.css';

const socket = socketIOClient(link);

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
        return (
            <div className="App">
                <HeaderPlay />
                <CirclesPlay />
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