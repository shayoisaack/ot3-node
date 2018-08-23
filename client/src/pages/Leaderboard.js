import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import Header from '../components/Header';
import Circles from '../components/Circles';
import LeaderboardList from '../components/LeaderboardList';
import socketIOClient from 'socket.io-client';
import { getCookie, link } from '../lib';
import './Play.css';

const socket = socketIOClient(link);

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="App">
                <Header />
                <Circles className="blur Circles" />
                <LeaderboardList/>
            </div>
        );
    }
}

export default Leaderboard;