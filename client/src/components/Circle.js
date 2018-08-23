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
      <div className="Circle" onClick={this.props.onClick} style={{left: this.props.x, top: this.props.y, backgroundColor: this.props.color}}>
        {this.props.number}
      </div>
    );
  }
}

export default Circle;
