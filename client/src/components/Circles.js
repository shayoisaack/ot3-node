import React, { Component } from 'react';
import './Circles.css';
import Circle from './Circle';
import {findHighestNo, loadNumbers} from '../load_game.js';

var winH = window.innerHeight;
var winW = window.innerWidth;
let seed = new Date().getTime();

class Circles extends Component {
    constructor() {
      super();
      this.state = {
        circles: []
      };
    }
    componentDidMount() {
      console.log(winH, winW);
      let highestNumber = findHighestNo(winH, winW);
      console.log(highestNumber);
      let circles = loadNumbers(highestNumber, seed);
      this.setState({circles: circles});
      //console.log(circles);
    }
  render() {
    return (
      <div className={this.props.className || "Circles"} style={{height: (winH - 51)+"px"}}>
          {this.state.circles.map(customer => 
            <Circle key={customer.id} number={customer.id} x={customer.x+"%"} y={customer.y+"%"}/>
          )}
      </div>
    );
  }
}

export default Circles;
