import { takeLatest, all, put, call } from "redux-saga/effects";
import { RouteTypes } from "../actions/types";

import {
  registerRouteFail,
  registerRouteSuccess,
} from "../actions";

import api from "../../../services/api";

const {
  REGISTER_ROUTE_REQUEST,
} = RouteTypes;

function* registerRouteSaga(action) {
  try {
    yield call(api.post, "maps/routes", action.payload);
    yield put(registerRouteSuccess(action.payload));
  } catch (error) {
    yield put(registerRouteFail(error));
  }
}

export function* rootDocumentSaga() {
  yield all([takeLatest(REGISTER_ROUTE_REQUEST, registerRouteSaga)]);
}