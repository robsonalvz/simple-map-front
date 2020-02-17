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
      refresh: false
    };
  }
  shouldComponentUpdate(props) {
    const { refresh } = this.props;
    if (refresh) {
      return true;
    }
    return false;
  }  
  componentDidUpdate() {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(
          this.props.origin.lat,
          this.props.origin.long
        ),
        destination: new google.maps.LatLng(
          this.props.destination.lat,
          this.props.destination.long
        ),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            refresh: ! this.state.refresh
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }
  render() {
    return (
      <GoogleMap
        defaultCenter={new google.maps.LatLng(-7.0970765, -34.8433803)}
        defaultZoom={15}
      >
        {this.state.directions && (
          <DirectionsRenderer directions={this.state.directions} />
        )}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(DirectionsMap));
