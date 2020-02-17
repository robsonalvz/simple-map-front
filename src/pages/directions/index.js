import React, { Component } from "react";
import DirectionsMap from "../../components/DirectionsMap";
import { Row, Col, Button, Divider } from "antd";
import SearchBox from "../../components/MapSearchBox";
import "./style.css"

class Directions extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      iconLoading: false,
      origin: {
        lat: -7.0970765, long: -34.8433803
      },
      destination: {
        lat: -7.094808, long: -34.841523
      },
      refresh: false,
    };
  }
  
  changeDirection = () =>  {
    this.setState({ loading: true, refresh: true})
    this.changeLoading()
  };

  changeLoading = () => {
    setTimeout(() => {
      this.setState({loading: false})
    }, 3000);
  }

  onOriginChanged = places => {
    const origin = {
      lat: places[0].geometry.location.lat(),
      long: places[0].geometry.location.lng()
    }
    this.setState({refresh: false,origin})
  };
  onDestinationChanged = places => {
    const destination = {
      lat: places[0].geometry.location.lat(),
      long: places[0].geometry.location.lng()
    }
    this.setState({refresh: false,destination})
  };
  render() {
    const { origin, destination, refresh} = this.state;
    return (
      <Row>
        <Col span={5}>
          <div className="leftBar">
            <label>Origem:</label>
            <SearchBox
              onPlacesChanged={(teste)=>console.log(teste)}
              placeholder="Digite o lugar de origem"
            />
            <label>Parada:</label>
            <SearchBox
              onPlacesChanged={this.onDestinationChanged}
              placeholder="Digite o lugar de parada"
            />
            <Button
              loading={this.state.loading}
              type="primary"
              onClick={this.changeDirection}
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
              refresh={refresh}
              origin={origin}
              destination={destination}
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
