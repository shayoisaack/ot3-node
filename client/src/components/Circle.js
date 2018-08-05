import React, { Component } from 'react';
import './Circle.css';

class Circle extends Component {
    constructor() {
      super();
      this.state = {
      };
    }
  render() {
    return (
      <div className="Circle" style={{left: this.props.x, top: this.props.y}}>
        {this.props.number}
      </div>
    );
  }
}

export default Circle;
