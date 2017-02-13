import React from 'react';
import { Component } from 'react';
import Chartist from 'chartist';

export default class App extends Component {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
