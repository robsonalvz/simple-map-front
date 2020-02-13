import React, { Component } from "react";
import DirectionsMap from "../../components/DirectionsMap";
import { Input } from "antd";
import MapSearchBox from '../../components/MapSearchBox';

import "./style.css";
// import { Container } from './styles';

class Directions extends Component {
  constructor() {
    super();
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
    return (
      <div>
        <div className="leftBar">
          <MapSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJcuxbD-Zq9mq_Qv4PdC-t25ogbFzn460&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            placeholder = "Digite o lugar de origem"
          />
          <MapSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJcuxbD-Zq9mq_Qv4PdC-t25ogbFzn460&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            placeholder = "Digite o lugar de parada"
          />
        </div>

        <div>
          <DirectionsMap
            origin={{ lat: -7.0970765, long: -34.8433803 }}
            desatination={{ lat: -7.094808, long: -34.841523 }}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJcuxbD-Zq9mq_Qv4PdC-t25ogbFzn460&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}
export default Directions;
