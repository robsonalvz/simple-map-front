import React, { Component } from "react";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { withScriptjs } from "react-google-maps";
import './style.css';


class MapSearchBox extends Component {
  componentWillMount() {
    const refs = {};
    this.setState({
      places: [],
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        this.setState({
          places
        });
        this.props.onPlacesChanged(this.state.places);
      }
    });
  }
  render() {
    return (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={this.state.onSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.state.onPlacesChanged}
        >
          <input
            type="text"
            placeholder={this.props.placeholder}
          />
        </StandaloneSearchBox>
      </div>
    );
  }
}
const SearchBoxWithScript = withScriptjs(MapSearchBox);

const SearchBox = ({onPlacesChanged, placeholder }) => 
  <SearchBoxWithScript
    onPlacesChanged={onPlacesChanged}
    placeholder={placeholder}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJcuxbD-Zq9mq_Qv4PdC-t25ogbFzn460&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
export default SearchBox;
