import React, { Component } from 'react';
import './Header.css';
import socketIOClient from 'socket.io-client';
import { getCookie, link } from '../lib';

const socket = socketIOClient(link);

class Header extends Component {
  constructor() {
    super();
    this.state = {
      myName: 'not logged in'
    }
  }
  componentDidMount() {
    console.log('bro', this.state.myName);
    if (getCookie('uid') !== null)
      socket.emit('login-check', getCookie('uid'));
    else
      console.log('login-check: not even cookie is set bro :-(');

    socket.on('login-check', myName => {
      if (myName !== null) {
        console.log('login-check: myName = ', myName);
        this.setState({ myName: myName });
      }
      else
        console.log('login-check: fail, not logged in server');
    });
  }
  render() {
    return (
      <div className="Header">
        <span className="headerItem">
          {this.state.myName}
        </span>
      </div>
    );
  }
}

export default Header;