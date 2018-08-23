import React, { Component } from 'react';
import './LoginForm.css';
import Button from './Button';
import { setCookie, getCookie, eraseCookie } from '../lib.js';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://172.20.10.4:5000');

var winH = window.innerHeight;
var winW = window.innerWidth;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      userName: ''
    };
  }
  componentDidMount() {
  }
  addUserHandler(evt) {
    console.log(this.state.userName);
    fetch('http://172.20.10.4:5000/login?userName=' + this.state.userName, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        setCookie('userName', user.userName);
        setCookie('uid', user.uid);
        window.location = '/games';
      });
    console.log('uid-test: ', getCookie('uid'));
    //socket.emit('login', {userName: this.state.userName, uid: getCookie('uid')});
    // socket.on('login', (user) => {
    //   console.log('user details:', user);
    //   setCookie('userName', user.userName);
    //   window.location = '/games';
    // });
  }
  render() {
    socket.on('user-connected', (id) => {
      console.log('id:', id);
      setCookie('uid', id);
    });

    return (
      <div className="LoginForm">
        <div className='LoginFormInput'>
          <div className="logo">
            <h1>Ot3<br/>multiplayer</h1>
            <h3>Welcome</h3>
          </div>
          <input className='input' placeholder='Enter your name' value={this.state.userName} onChange={evt => this.updateUserName(evt)} />
          <Button text='Login' onClick={evt => this.addUserHandler(evt)} />
        </div>
      </div>
    );
  }

  updateUserName(evt) {
    this.setState({
      userName: evt.target.value
    });
  }
}

export default LoginForm;
