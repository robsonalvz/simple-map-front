import { handleActions } from "redux-actions";
import { RouteTypes } from "../actions/types";
const {
  REGISTER_ROUTE_REQUEST,
  REGISTER_ROUTE_SUCCESS,
  REGISTER_ROUTE_FAIL,
} = RouteTypes;
 
export default handleActions(
  new Map([
    [
      REGISTER_ROUTE_REQUEST,
      (state, action) => ({
        route: '',
        error: false,
        loading: true
      })
    ],
    [
      REGISTER_ROUTE_SUCCESS,
      (state, action) => ({
        route: action.payload,
        error: false,
        loading: false
      })
    ],
    [
      REGISTER_ROUTE_FAIL,
      (state, action) => ({
        route: '',
        error: action.payload,
        loading: false
      })
    ]
  ]),
  { route: [],  error: false, loading: false }
);
