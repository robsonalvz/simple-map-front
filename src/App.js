import React from "react";
import { Provider } from "react-redux";
import Directions from './pages/directions'
import "antd/dist/antd.css";
import store from './store';
const App = ()  => {
    return (
      <Provider store={store}>
          <Directions />
      </Provider>
    ) 
}
export default App;