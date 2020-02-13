import React, { Component } from "react";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { withScriptjs }  from 'react-google-maps';

class MapSearchBox extends Component {
  componentWillMount() {
    const refs = {}
    this.setState({
      places: [],
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        this.setState({
          places,
        });
      },
    })
  }
  render() {
    console.log(this.state.places)
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
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </StandaloneSearchBox>
      </div>
    );
  }
}
export default withScriptjs(MapSearchBox);