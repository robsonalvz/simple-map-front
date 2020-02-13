import React, { Component } from "react";
import DirectionsMap from "../../components/DirectionsMap";
import { Row, Col, Button, Divider } from "antd";
import SearchBox from "../../components/MapSearchBox";
import "antd/dist/antd.css";
import "./style.css";

class Directions extends Component {
  state = {
    loading: false,
    iconLoading: false,
    origin: {
      lat: "",
      long: ""
    },
    desatination: {
      lat: "",
      long: ""
    }
  };
  enterLoading = () => {
    this.setState({ loading: true });
  };
  onPlacesChanged = places => {
    console.log(places);
  };
  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };
  render() {
    return (
      <Row>
        <Col span={5}>
          <div className="leftBar">
            <SearchBox
              onPlacesChanged={this.onPlacesChanged}
              placeholder="Digite o lugar de origem"
            />
            <SearchBox
              onPlacesChanged={this.onPlacesChanged}
              placeholder="Digite o lugar de parada"
            />
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={this.enterLoading}
            >
              Roteirizar
            </Button>
            <Divider />
            <div>
              <label>Distância: </label>
              <label>Tempo estimado:</label>
            </div>
          </div>
        </Col>
        <Col span={19}>
          <div className="map">
            <DirectionsMap
              origin={{ lat: -7.0970765, long: -34.8433803 }}
              desatination={{ lat: -7.094808, long: -34.841523 }}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJcuxbD-Zq9mq_Qv4PdC-t25ogbFzn460&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
      </Row>
    );
  }
}
export default Directions;
