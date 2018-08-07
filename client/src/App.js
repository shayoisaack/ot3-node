import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Circles from './components/Circles';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Circles/>
      </div>
    );
  }
}

export default App;