import React, { Component } from 'react';
import '../App.css';
import Header from '../components/Header';
import Circles from '../components/Circles';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Circles/>
        <LoginForm />
      </div>
    );
  }
}

export default Login;