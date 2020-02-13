import React, { Component } from "react";

// import { Container } from './styles';

class directions extends Component {
  constructor() {
    super()
    this.state = {
      origin: {
        lat: "",
        long: ""
      },
      desatination: {
        lat: "",
        long: ""
      }
    };
  }
  render() {
    return <div />;
  }
}
export default directions;
