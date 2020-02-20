import React, { Component } from "react";
import DirectionsMap from "../../components/Maps/DirectionsMap";
import SearchBox from "../../components/Maps/MapSearchBox";
import Actions from '../../store/root/actions';
import { Layout, Button, Divider, Icon, Typography, notification } from "antd";
import "./style.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const { Text } = Typography;
const { Content, Sider } = Layout;
const googleProps = {
  googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
};

class Directions extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      origin: {
        lat: null,
        long: null},
      destination : {
        lat: null,
        long: null
      },
      waypoints: [],
      refresh: false
    };
  }
  remove = index => {
    console.log(this.state.waypoints)
    const { waypoints } = this.state;
    waypoints.splice(index, 1);
    console.log(waypoints)
    this.setState({ waypoints });
  };
  add = () => {
    if (this.state.waypoints.length <= 5) {
      this.setState({
        waypoints: [...this.state.waypoints, {}]
      });
    } else {
      notification.open({
        message: "Número máximo de pontos",
        description: "O número máximo de rotas foi excedido. "
      });
    }
    console.log(this.state.waypoints)
  };
  changeDirection = () => {
    this.setState({ loading: true, refresh: true });
    const route = {
      origin: this.state.origin,
      destination: this.state.destination,
      waypoints: this.state.waypoints
    }
    this.props.registerRouteRequest(route)
    this.changeLoading();
  };

  changeLoading = () => {
    setTimeout(() => {
      this.setState({ loading: false, refresh: false });
    }, 500);
  };

  onOriginChanged = places => {
    const origin = this.getLatLong(places)
    this.setState({ origin });
  };
  onDestinationChanged = places => {
    const destination = this.getLatLong(places)
    this.setState({ destination });
  };
  onWayPointChanged = (places, index) => {
    const waypoint = this.getLatLong(places)
    const { waypoints } = this.state;
    waypoints[index] = waypoint;
    this.setState({ waypoints: waypoints });
  };
  getLatLong = places =>{
    return {
      lat: places[0].geometry.location.lat(),
      long: places[0].geometry.location.lng()
    }
  }
  render() {
    const { origin, destination } = this.state;
    console.log("Ola",process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    return (
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0" width={260}>
          <h2>Simple router</h2>
          <div className="leftBar">
            <label>Origem:</label>
            <SearchBox
              onPlacesChanged={this.onOriginChanged}
              placeholder="Digite o lugar de origem"
              {...googleProps}
            />
            <label>Parada:</label>
            <div className="destination">
              <SearchBox
                onPlacesChanged={places => this.onDestinationChanged(places)}
                placeholder="Digite o lugar de parada"
                {...googleProps}
              />
              <Icon
                onClick={this.add}
                theme="twoTone"
                type="plus-circle"
                className="plus-icon"
              />
            </div>
            {this.state.waypoints.map((point, index) => {
              return (
                <div key={index} className="destination">
                  <SearchBox
                    onPlacesChanged={places =>
                      this.onWayPointChanged(places, index)
                    }
                    placeholder="Digite o lugar de parada"
                    {...googleProps}
                  />
                  <Icon
                    type="minus-circle-o"
                    theme="twoTone"
                    className="plus-icon"
                    onClick={() => this.remove(index)}
                  />
                  )
                </div>
              );
            })}

            <Button loading={this.state.loading} onClick={this.changeDirection}>
              Roteirizar
            </Button>
            <div className="infos">
              <Divider className="sectionDivider" />
              <Text>Distância: 120 kml</Text> <br />
              <Text>Tempo estimado: 2 horas </Text>
            </div>
          </div>
        </Sider>
        <Layout>
          <Content>
            <DirectionsMap
              refresh={this.state.refresh}
              origin={origin}
              waypoints={this.state.waypoints}
              destination={destination}
              {...googleProps}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(Actions, dispatch);

const mapStateToProps = state => ({
  loading: state.routes.loading,
  error: state.routes.error,
});
export default connect(mapStateToProps, mapDispatchToProps )(Directions);
