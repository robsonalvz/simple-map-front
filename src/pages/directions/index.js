import React, { Component } from "react";
import DirectionsMap from "../../components/Maps/DirectionsMap";
import SearchBox from "../../components/Maps/MapSearchBox";
import {
  Layout,
  Menu,
  Button,
  Divider,
  Icon,
  Typography,
  Row,
  Col
} from "antd";
import "./style.css";
const { Text } = Typography;
const { Content, Sider } = Layout;
const props = {
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJcuxbD-Zq9mq_Qv4PdC-t25ogbFzn460&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100vh` }} />,
  mapElement: <div style={{ height: `100%` }} />
};
class Directions extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      iconLoading: false,
      origin: {},
      destinations: [{}],
      refresh: false,
    };
  }
  remove = index => {
    const {destinations}  = this.state;
    destinations.splice(index, 1);
    this.setState({ destinations: destinations })
  };
  add = () => {
    this.setState({
      destinations: [...this.state.destinations, {}]
    });
  };
  changeDirection = () => {
    this.setState({ loading: true, refresh: true }, () => this.changeLoading());
  };

  changeLoading = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  onOriginChanged = places => {
    const origin = {
      lat: places[0].geometry.location.lat(),
      long: places[0].geometry.location.lng()
    };
    this.setState({ origin });
  };
  onDestinationChanged = (places, index) => {
    const destination = {
      lat: places[0].geometry.location.lat(),
      long: places[0].geometry.location.lng()
    };
    const { destinations } = this.state;
    destinations[index] = destination;
    this.setState({destinations: destinations })
  };
  render() {
    const { origin, destinations, refresh } = this.state;
    console.log(this.state)
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          width={260}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <h2>Simple router</h2>
          <div className="leftBar">
            <label>Origem:</label>
            <SearchBox
              onPlacesChanged={this.onOriginChanged}
              placeholder="Digite o lugar de origem"
              {...props}
            />
            <label>Parada:</label>
            {
              this.state.destinations.map((destination, index) =>{
                return (
                  <div className="destination">  
                  <SearchBox
                    key={index}
                    onPlacesChanged={(places) => this.onDestinationChanged(places, index)}
                    placeholder="Digite o lugar de parada"
                    {...props}
                  />                  
                  { 
                    index === this.state.destinations.length-1 
                    ?
                      <Icon
                        onClick={this.add}
                        theme="twoTone"
                        type="plus-circle"
                        className="plus-icon"
                      />
                    :
                      <Icon
                        type="minus-circle-o"
                        theme="twoTone"
                        className="plus-icon"
                        onClick={() => this.remove(index)}
                    />
                  }
                 
                 
                </div>
        
                )
              })
            }
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
            <div>
              <DirectionsMap
                refresh={refresh}
                origin={origin}
                destination={destinations[0]}
                {...props}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Directions;
