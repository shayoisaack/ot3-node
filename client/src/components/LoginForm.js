import React, { Component } from 'react';
import './LoginForm.css';
import Button from './Button';
import {setCookie, getCookie, eraseCookie} from '../lib.js'

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
    addUserHandler(evt){
        console.log(this.state.userName);
        fetch('http://localhost:5000/adduser?userName='+this.state.userName,{
          method: 'GET',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setCookie('uid', data.uid, 14);
          window.location = '/games';
        });
    }
  render() {
    return (
      <div className="LoginForm">
      <div className='LoginFormInput'>
        <input className='input' placeholder='Enter your name' value={this.state.userName} onChange={evt => this.updateUserName(evt)}/>
        <Button text='Go' onClick={evt => this.addUserHandler(evt)}/>
        </div>
      </div>
    );
  }

  updateUserName(evt){
    this.setState({
      userName: evt.target.value
    });
  }
}

export default LoginForm;
