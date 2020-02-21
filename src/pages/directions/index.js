import React, { Component } from "react";
import DirectionsMap from "../../components/maps/DirectionsMap";
import SearchBox from "../../components/maps/MapSearchBox";
import Actions from "../../store/root/actions";
import { Layout, Button, Divider, Icon, Typography, notification } from "antd";
import "./style.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const { Text } = Typography;
const { Content, Sider } = Layout;
const googleProps = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100vh` }} />,
  mapElement: <div style={{ height: `100%` }} />
};

class Directions extends Component {
  constructor() {
    super();
    this.state = {
      origin: {
        lat: null,
        long: null
      },
      destination: {
        lat: null,
        long: null
      },
      waypoints: [],
      distance: {
        text: "",
        value: 0
      },
      duration: {
        text: "",
        value: 0
      },
      refresh: false,
      directions: ''
    };
  }
  remove = index => {
    const { waypoints } = this.state;
    waypoints.splice(index, 1);
    this.setState({ waypoints });
  };
  add = () => {
    const { waypoints } = this.state;
    if (
      waypoints.length !== 0 &&
      Object.keys(waypoints[waypoints.length - 1]).length === 0
    ) {
      notification.open({
        message: "Campos obrigatórios",
        description: "Preencha a ultimo local para adicionar um novo. "
      });
    } else if (this.state.waypoints.length <= 5) {
      this.setState({
        waypoints: [...this.state.waypoints, {}]
      });
    } else {
      notification.open({
        message: "Número máximo de pontos",
        description: "O número máximo de rotas foi excedido. "
      });
    }
  };
  submitRoute = () => {
    this.setState({ refresh: !this.state.refresh });
    const { origin, destination, waypoints, duration, distance } = this.state;
      const route = {
        origin,
        destination,
        waypoints,
        duration,
        distance
      };
      this.props.registerRouteRequest(route);
      this.changeLoading();
  };

  onChangeDirection = direction => {
    this.setState({
      distance: direction.routes[0].legs[0].distance,
      duration: direction.routes[0].legs[0].duration
    });
  };

  changeLoading = () => {
    setTimeout(() => {
      this.setState({ refresh: false });
    }, 800);
  };

  onOriginChanged = places => {
    const origin = this.getLatLong(places);
    this.setState({ origin });
  };
  onDestinationChanged = places => {
    const destination = this.getLatLong(places);
    this.setState({ destination });
  };
  onWayPointChanged = (places, index) => {
    const waypoint = this.getLatLong(places);
    const { waypoints } = this.state;
    waypoints[index] = waypoint;
    this.setState({ waypoints: waypoints });
  };
  getLatLong = places => {
    return {
      lat: places[0].geometry.location.lat(),
      long: places[0].geometry.location.lng()
    };
  };
  render() {
    const {
      origin,
      destination,
      distance,
      waypoints,
      duration,
      refresh
    } = this.state;
    return (
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0" width={300}>
          <h2>Simple router</h2>
          <div className="leftBar">
            <label>Origem:</label>
            <SearchBox
              onPlacesChanged={this.onOriginChanged}
              placeholder="Digite o lugar de origem"
              {...googleProps}
            />{" "}
            <br />
            <label>Parada:</label>
            <div className="destination">
              <SearchBox
                onPlacesChanged={places => this.onDestinationChanged(places)}
                placeholder="Digite o lugar de parada"
                {...googleProps}
              />
            </div>
            <br />
            {waypoints.length > 0 && <label>Pontos de parada:</label>}
            {waypoints.map((point, index) => {
              return (
                <div key={index} className="destination">
                  <SearchBox
                    onPlacesChanged={places =>
                      this.onWayPointChanged(places, index)
                    }
                    placeholder="Digite o lugar de parada"
                    {...googleProps}
                  />
                  {waypoints.length - 1 === index && (
                    <Icon
                      type="minus-circle-o"
                      theme="twoTone"
                      className="plus-icon"
                      onClick={() => this.remove(index)}
                    />
                  )}
                </div>
              );
            })}
            <Button type="dashed" onClick={this.add} style={{ width: "240px" }}>
              <Icon type="plus" /> Adicionar parada
            </Button>
            <Button loading={this.props.loading} onClick={this.submitRoute}>
              Roteirizar
            </Button>
            <div className="infos">
              <Divider className="sectionDivider" />
              <Text>Distância: {distance.text}</Text> <br />
              <Text>Tempo estimado: {duration.text} </Text>
            </div>
          </div>
        </Sider>
        <Layout>
          <Content>
            <DirectionsMap
              onChangeDirection={direction => this.onChangeDirection(direction)}
              refresh={refresh}
              origin={origin}
              waypoints={waypoints}
              destination={destination}
              {...googleProps}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const mapStateToProps = state => ({
  loading: state.routes.loading,
  error: state.routes.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Directions);
