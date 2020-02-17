import { createAction } from "redux-actions";
import { RouteTypes } from "./types";

const {
  REGISTER_ROUTE_REQUEST,
  REGISTER_ROUTE_SUCCESS,
  REGISTER_ROUTE_FAIL,
} = RouteTypes;

export const registerRouteRequest = createAction(REGISTER_ROUTE_REQUEST);
export const registerRouteSuccess = createAction(REGISTER_ROUTE_SUCCESS);
export const registerRouteFail = createAction(REGISTER_ROUTE_FAIL);