import { combineReducers } from 'redux';
import routesReducer from '../routes/reducers';

const createRootReducer = () => combineReducers({
  routes: routesReducer,
});

export default createRootReducer;