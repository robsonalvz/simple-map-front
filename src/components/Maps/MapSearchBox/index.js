import React, { Component } from "react";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { withScriptjs } from "react-google-maps";
import './style.css';


class MapSearchBox extends Component {
  constructor(){
    super();
    const refs = {};
    this.state = {
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
    }
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
export default withScriptjs(MapSearchBox);

