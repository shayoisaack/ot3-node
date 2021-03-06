import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Circles from './components/Circles';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

class App extends Component {
  render() {
    socket.on('user-connected', (id) => {
      console.log('id', id);
    });
    return (
      <div className="App">
        <Header/>
        <Circles/>
      </div>
    );
  }
}

export default App;