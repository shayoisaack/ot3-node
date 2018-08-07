import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

  render() {
    return (
        <div className='Button' onClick={this.props.onClick} style={this.props.style}>
          {this.props.text}
        </div>
    );
  }
}

export default Button;
