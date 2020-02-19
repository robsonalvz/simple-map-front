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
      directions: ""
    };
  }
  shouldComponentUpdate(props) {
    if (props.refresh) return true;
    return false;
  }

  route() {
    const { origin, destination, waypoints } = this.props;
    const DirectionsService = new google.maps.DirectionsService();
    const locations = [];
    waypoints.forEach(waypoint => {
      locations.push({
        location: new google.maps.LatLng(waypoint.lat, waypoint.long)
      });
    });
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.long),
        destination: new google.maps.LatLng(destination.lat, destination.long),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [...locations]
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
          console.log("Atualizado");
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  componentDidUpdate() {
    this.route();
  }
  componentDidMount() {
    this.route();
  }
  render() {
    console.log("Directions", this.state.directions);
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
