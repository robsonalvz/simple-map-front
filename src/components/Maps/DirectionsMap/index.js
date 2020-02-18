/* global google */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

class DirectionsMap extends Component {
  constructor() {
    super();
    this.state = {
      directions: "",
    };
  }
  shouldComponentUpdate(props) {
    if (this.props.refresh) return true;
    return false;
  }  
  route(){
    const {  origin, destination, waypoints } = this.props;
    if (typeof(origin) !== 'undefined' && typeof(destination) !== 'undefined' && typeof(waypoints) !== 'undefined' ) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            origin.lat,
            origin.long
          ),
          destination: new google.maps.LatLng(
            destination.lat,
            destination.long
          ),
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
            console.log("Atualizado")
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }else{
      console.log("No directions")
    }
  
  }
  componentDidUpdate() {
    this.route();
  }
  render() {
    return (
      <GoogleMap
        defaultCenter={new google.maps.LatLng(-7.0970765, -34.8433803)}
        defaultZoom={15}
      >
        {this.state.directions && (
          <DirectionsRenderer directions={this.state.directions}  />
        )}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(DirectionsMap));
